# config/utils.py
from django.core.cache import cache
from django.conf import settings


def get_key_pattern(key_prefix: str):
    """
    key format for redis. key_prefix must be unique
    """
    return f"views.decorators.cache.cache_*.{key_prefix}.*.{settings.LANGUAGE_CODE}.{settings.TIME_ZONE}"


def delete_cache(key_prefix: str):
    if key_prefix != None:
        print(f"Deleting cache keys with pattern: {get_key_pattern(key_prefix)}")
        cache.delete_pattern(get_key_pattern(key_prefix))
        cache.delete_pattern(get_key_pattern("cached-view"))
