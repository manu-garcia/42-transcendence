from django.utils.deprecation import MiddlewareMixin
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model


class UpdateLastActivityMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.headers.get("Authorization"):
            try:
                token_key = request.headers["Authorization"].split()[1]
                token = Token.objects.get(key=token_key)
                if token.user.is_authenticated:
                    token.user.update_last_activity()
            except Token.DoesNotExist:
                print("UpdateLastActivityMiddleware: Invalid token")

        return None
