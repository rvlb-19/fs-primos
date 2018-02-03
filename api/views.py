from rest_framework.views import APIView
from rest_framework.response import Response

from .models import PrimeNumber

def is_prime(n):
    if n <= 1:
        return False
    i = 2
    while i*i <= n:
        if n % i == 0:
            return False
        i += 1
    return True

class PrimeView(APIView):
    def post(self, request, format=None):
        data = request.data
        number = int(data.get('number'))
        return Response({ 'prime': is_prime(number) })

class PrimeDBView(APIView):
    def post(self, request, format=None):
        data = request.data
        number = data.get('number')
        return Response({ 'prime': PrimeNumber.objects.filter(number=number).count() > 0 })