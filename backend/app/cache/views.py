from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework import viewsets

from .utils import delete_cache

CACHE_SECONDS = 0
CACHE_KEY_PREFIX_DEFAULT = None


class CacheMixin:
    def __init_subclass__(cls, **kwargs):
        """
        Adds a method_decorator to function 'list' if CACHE_KEY_PREFIX has value in child class

        It should generate something that looks like this:

        @method_decorator(cache_page(CACHE_SECONDS, key_prefix=CACHE_KEY_PREFIX))
        def list(self, request, *args, **kwargs):
            return super().list(request, *args, **kwargs)

        Only adds the method_decorator, and leaves the implementation of 'list' as is
        """
        super().__init_subclass__(**kwargs)
        cache_key_prefix = getattr(cls, "CACHE_KEY_PREFIX", CACHE_KEY_PREFIX_DEFAULT)
        if cache_key_prefix:
            print(
                f"Applying cache decorator to {cls.__name__} with key prefix {cache_key_prefix}"
            )
            cls.list = method_decorator(
                cache_page(CACHE_SECONDS, key_prefix=cache_key_prefix)
            )(cls.list)
        else:
            print(
                f"WARNING!!! Class {cls.__name__} inherits from CacheMixin but does not override CACHE_KEY_PREFIX"
            )


class CachedViewSet(CacheMixin, viewsets.ModelViewSet):
    # This must be overridden with a unique key prefix
    CACHE_KEY_PREFIX = CACHE_KEY_PREFIX_DEFAULT

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
