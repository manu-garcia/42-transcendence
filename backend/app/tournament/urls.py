from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TournamentViewSet

router = DefaultRouter(trailing_slash=True)
router.register("", TournamentViewSet)

urlpatterns = router.urls
