from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter(trailing_slash=True)
router.register("", UserViewSet)

urlpatterns = router.urls
