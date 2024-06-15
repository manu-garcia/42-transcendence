from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet

router = DefaultRouter(trailing_slash=True)
router.register("", EventViewSet, basename="events")

urlpatterns = [
    path(
        "events/<int:pk>/match/",
        EventViewSet.as_view({"post": "match", "get": "next_match"}),
        name="event-match",
    ),
] + router.urls
