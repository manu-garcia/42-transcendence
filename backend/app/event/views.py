from cache.views import CachedViewSet

from .models import Event
from .serializers import EventSerializer


class EventViewSet(CachedViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    http_method_names = ["get", "post", "put", "delete"]

    CACHE_KEY_PREFIX = "event-view"
