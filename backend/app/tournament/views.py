from django.http import JsonResponse
from django.views import View
from .models import Tournament


class TournamentView(View):
    def get(self, request):
        tournaments = Tournament.objects.values("id", "name")
        tournaments_list = list(tournaments)
        return JsonResponse(tournaments_list, safe=False)
