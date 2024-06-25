from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet

router = DefaultRouter(trailing_slash=True)
router.register("", EventViewSet, basename="events")

urlpatterns = [
    path(
        "events/<int:pk>/match/",
        EventViewSet.as_view({"post": "match", "get": "next_match", "get": "matches"}),
        name="event-match",
    ),
    path(
        "stats/user/<int:pk>/matches-won/",
        EventViewSet.as_view({"get": "matches_won"}),
        name="matches-won",
    ),
    path(
        "stats/user/<int:pk>/events-won/",
        EventViewSet.as_view({"get": "events_won"}),
        name="events-won",
    ),
] + router.urls
