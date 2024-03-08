from django.http import JsonResponse
from django.views import View
from .models import User


class UserView(View):
    def get(self, request):
        users = User.objects.values("id", "name")
        users_list = list(users)
        return JsonResponse(users_list, safe=False)
