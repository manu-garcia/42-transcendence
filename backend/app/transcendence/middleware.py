from django.http import HttpResponse


class Error500HandlerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if response.status_code == 500:
            print("Error500HandlerMiddleware ... 500 ERROR!!!")
            return HttpResponse()
        return response
