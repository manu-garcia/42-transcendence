from rest_framework import serializers
from .models import Event, EventGroup, EventGroupUser, EventType, EventMatch, User


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "played",
            "type",
            "winner_event_group",
        ]

    def to_internal_value(self, data):
        name = data.get("name")
        type = data.get("type")

        if not name:
            raise serializers.ValidationError({"name": "This field is required."})
        if not type:
            raise serializers.ValidationError({"type": "This field is required."})

        return {"name": name, "type": type}

    def create(self, validated_data):

        # Create event group user
        def create_event_group_user(event_group, event_group_user_data):
            user_data = event_group_user_data.pop("user", None)
            user_instance = User.objects.get(id=user_data["id"])
            event_group_user_data["user"] = user_instance
            event_group_user_data["event_group"] = event_group
            EventGroupUser.objects.create(**event_group_user_data)

        max_users = self.initial_data.pop("max_users", None)
        event_group_user_1_data = self.initial_data.pop("users_1", [])
        event_group_user_2_data = self.initial_data.pop("users_2", [])

        validated_data.pop("users_1", [])
        validated_data.pop("users_2", [])

        # Create event
        event = Event.objects.create(**validated_data)

        # Create event group
        event_group_data = {}
        event_group_data["event"] = event
        event_group_data["max_users"] = max_users

        event_groups = []

        if validated_data["type"] == EventType.QUICK_GAME:
            event_groups.append(EventGroup.objects.create(**event_group_data))
            event_groups.append(EventGroup.objects.create(**event_group_data))
            for event_group_user_data in event_group_user_1_data:
                create_event_group_user(event_groups[0], event_group_user_data)
            for event_group_user_data in event_group_user_2_data:
                create_event_group_user(event_groups[1], event_group_user_data)
            
            # Create event match for quick-game
            EventMatch.objects.create(
                event=event,
                event_group_1=event_groups[0],
                event_group_2=event_groups[1],
                points_delta=0,
            )

        elif validated_data["type"] == EventType.TOURNAMENT:
            len = 0
            for event_group_user_data in event_group_user_1_data:
                event_groups.append(EventGroup.objects.create(**event_group_data))
                create_event_group_user(event_groups[len], event_group_user_data)
                len += 1

            # Create event match for quick-game
            for i in range(len):
                for j in range(i + 1, len):
                    EventMatch.objects.create(
                        event=event,
                        event_group_1=event_groups[i],
                        event_group_2=event_groups[j],
                        points_delta=0,
                    )

        return event
