from datetime import datetime
from django.http import Http404
from django.db.models import Q
from cache.views import CachedViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from cache.utils import delete_cache

from .models import Event, EventMatch, EventGroup, EventGroupUser
from .serializers import EventSerializer, EventGroupSerializer, EventType
from user.serializers import UserSerializer
from user.models import User


class EventViewSet(CachedViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    http_method_names = ["get", "post", "put", "delete"]

    CACHE_KEY_PREFIX = "event-view"

    # "events/stats/user/<int:pk>/matches-won/",
    @action(detail=True, methods=["get"])
    def matches_won(self, request, pk=None):
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        # Filter events where the user belongs to a participating group
        event_groups = EventGroupUser.objects.filter(user=user)
        event_group_ids = event_groups.values_list("event_group_id", flat=True)

        # Count total matches played (user is in either group 1 or group 2)
        total_matches_played = EventMatch.objects.filter(
            Q(played=True)
            & (Q(group_1__in=event_group_ids) | Q(group_2__in=event_group_ids))
        ).count()

        # Count victories (user's group is the winner_event_match_group)
        total_matches_won = EventMatch.objects.filter(
            Q(played=True)
            & (
                Q(
                    group_1__in=event_group_ids,
                    winner_event_match_group__in=event_group_ids,
                )
                | Q(
                    group_2__in=event_group_ids,
                    winner_event_match_group__in=event_group_ids,
                )
            )
        ).count()

        return Response(
            {
                "user_id": user.id,
                "played": total_matches_played,
                "won": total_matches_won,
                "lost": total_matches_played - total_matches_won,
            }
        )

    # "events/stats/user/<int:pk>/events-won/",
    @action(detail=True, methods=["get"])
    def events_won(self, request, pk=None):
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        # Filter events where the user belongs to a participating group
        event_groups = EventGroupUser.objects.filter(user=user)
        event_group_ids = event_groups.values_list("event_group_id", flat=True)

        # Count total events participated in (using distinct to avoid duplicates)
        total_events_played = (
            Event.objects.filter(eventgroup__in=event_group_ids, played=True)
            .distinct()
            .count()
        )

        # Count events won (filter by winner_event_group)
        total_events_won = Event.objects.filter(
            winner_event_group__in=event_group_ids, played=True
        ).count()

        return Response(
            {
                "user_id": user.id,
                "played": total_events_played,
                "won": total_events_won,
                "lost": total_events_played - total_events_won,
            }
        )

    # /events/<int:pk>/next_match/
    @action(detail=True, methods=["get"])
    def next_match(self, request, pk=None):

        # Check and get the event data
        try:
            event = Event.objects.get(id=pk)
        except Event.DoesNotExist:
            raise Http404

        matches = EventMatch.objects.filter(event=event, played=False)

        if matches:

            match = matches[0]
            event_group_users_1 = EventGroupUser.objects.filter(
                event_group=match.group_1
            )
            event_group_users_2 = EventGroupUser.objects.filter(
                event_group=match.group_2
            )

            # Map users with alias
            users_with_alias_1 = []
            for event_group_user in event_group_users_1:
                user_data = {
                    "user": UserSerializer(event_group_user.user).data,
                    "alias": event_group_user.alias,
                }
                users_with_alias_1.append(user_data)
            users_with_alias_2 = []
            for event_group_user in event_group_users_2:
                user_data = {
                    "user": UserSerializer(event_group_user.user).data,
                    "alias": event_group_user.alias,
                }
                users_with_alias_2.append(user_data)

            # Map match data
            match_id = match.id
            match_event = EventSerializer(match.event).data

            match_group_1 = {
                "id": match.group_1.id,
                "event": EventSerializer(match.group_1.event).data,
                "max_users": match.group_1.max_users,
                "users": users_with_alias_1,
            }
            match_group_2 = {
                "id": match.group_2.id,
                "event": EventSerializer(match.group_2.event).data,
                "max_users": match.group_2.max_users,
                "users": users_with_alias_2,
            }

            match_played = match.played
            match_points_delta = match.points_delta
            match_date = match.date
            match_winner_event_match_group = EventGroupSerializer(
                match.winner_event_match_group
            ).data
            return Response(
                {
                    "id": match_id,
                    "event": match_event,
                    "group_1": match_group_1,
                    "group_2": match_group_2,
                    "played": match_played,
                    "points_delta": match_points_delta,
                    "winner_event_match_group": match_winner_event_match_group,
                    "date": match_date,
                },
                status=200,
            )
        else:
            raise Http404

    # /events/<int:pk>/match/
    @action(detail=True, methods=["post"])
    def match(self, request, pk=None):

        # Check and get the event data
        try:
            event = Event.objects.get(id=pk)
        except Event.DoesNotExist:
            raise Http404

        try:
            # Update match
            if request.data["played"]:
                match = EventMatch.objects.get(id=request.data["id"])
                match.played = request.data["played"]
                match.points_delta = request.data["points_delta"]
                match.winner_event_match_group = EventGroup.objects.get(
                    id=request.data["winner_event_match_group"].get("id")
                )
                match.date = datetime.now()
                match.save()
        except Exception as e:
            return Response({"error": "Bad request"}, status=400)

        matches = EventMatch.objects.filter(event=event, played=False)

        # Check if the event has ended
        if not matches:

            # Update QUICK-GAME event
            if event.type == EventType.QUICK_GAME:
                event.played = True
                event.winner_event_group = EventGroup.objects.get(
                    id=request.data["winner_event_match_group"].get("id")
                )
                event.save()
                return Response({"success": "Quick-game results updated"}, status=200)

            # Update TOURNAMENT event
            matches = EventMatch.objects.filter(event=event)
            winners = []

            # Get and map the winners of the matches
            for match in matches:
                new_winner = True
                for winner in winners:
                    if winner["group"]["id"] == match.winner_event_match_group.id:
                        winner["wins"] += 1
                        winner["points"] += match.points_delta
                        new_winner = False
                        break
                if new_winner:
                    winners.append(
                        {
                            "group": EventGroupSerializer(
                                match.winner_event_match_group
                            ).data,
                            "wins": 1,
                            "points": match.points_delta,
                        }
                    )

            # Determine and save the winner of the tournament
            event_winner = max(winners, key=lambda x: (x["wins"], x["points"]))
            event.played = True
            event.winner_event_group = EventGroup.objects.get(
                id=event_winner["group"]["id"]
            )
            event.save()
            delete_cache(self.CACHE_KEY_PREFIX)
            return Response({"success": "Tournament results updated"}, status=200)
        else:
            return Response({"success": "Match result updated"}, status=200)

    # /events/<int:pk>/matches/
    @action(detail=True, methods=["get"])
    def matches(self, request, pk=None):

        # Check and get the event data
        try:
            event = Event.objects.get(id=pk)
        except Event.DoesNotExist:
            raise Http404

        matches = EventMatch.objects.filter(event=event)

        if matches:

            # Map matches data
            matches_data = []
            for match in matches:
                event_group_users_1 = EventGroupUser.objects.filter(
                    event_group=match.group_1
                )
                event_group_users_2 = EventGroupUser.objects.filter(
                    event_group=match.group_2
                )

                # Map users with alias
                users_with_alias_1 = []
                for event_group_user in event_group_users_1:
                    user_data = {
                        "user": UserSerializer(event_group_user.user).data,
                        "alias": event_group_user.alias,
                    }
                    users_with_alias_1.append(user_data)
                users_with_alias_2 = []
                for event_group_user in event_group_users_2:
                    user_data = {
                        "user": UserSerializer(event_group_user.user).data,
                        "alias": event_group_user.alias,
                    }
                    users_with_alias_2.append(user_data)

                # Map match data
                match_id = match.id
                match_event = EventSerializer(match.event).data

                match_group_1 = {
                    "id": match.group_1.id,
                    "event": EventSerializer(match.group_1.event).data,
                    "max_users": match.group_1.max_users,
                    "users": users_with_alias_1,
                }
                match_group_2 = {
                    "id": match.group_2.id,
                    "event": EventSerializer(match.group_2.event).data,
                    "max_users": match.group_2.max_users,
                    "users": users_with_alias_2,
                }

                match_played = match.played
                match_points_delta = match.points_delta
                match_winner_match_group = EventGroupSerializer(
                    match.winner_event_match_group
                ).data
                match_date = match.date
                if match_winner_match_group.get("id") == match_group_1.get("id"):
                    match_winner_match_group = match_group_1
                elif match_winner_match_group.get("id") == match_group_2.get("id"):
                    match_winner_match_group = match_group_2
                match_data = {
                    "id": match_id,
                    "event": match_event,
                    "group_1": match_group_1,
                    "group_2": match_group_2,
                    "played": match_played,
                    "points_delta": match_points_delta,
                    "winner_event_match_group": match_winner_match_group,
                    "date": match_date,
                }
                matches_data.append(match_data)

            return Response(matches_data, status=200)
        else:
            raise Http404
