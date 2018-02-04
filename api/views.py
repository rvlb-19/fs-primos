from rest_framework.views import APIView
from rest_framework.response import Response

from .models import PrimeNumber

from mpmath import *
mp.dps=10000000

def primality_base_checking(request, func):
    data = request.data
    number = int(data.get('number'))
    result = func(number)
    return Response({ 'prime': result[0], 'reason': result[1] })

def is_prime(n):
    if n <= 1:
        return (False, 'Número negativo')
    i = 2
    while i*i <= n:
        if n % i == 0:
            return (False, '{} é divisor'.format(i))
        i += 1
    return (True, '')

class PrimeView(APIView):
    def post(self, request, format=None):
        return primality_base_checking(request, is_prime)

def is_number_in_db(number):
    return (
        PrimeNumber.objects.filter(number=number).count() > 0, 
        'Número não encontrado no banco de dados'
    )

class PrimeDBView(APIView):
    def post(self, request, format=None):
        return primality_base_checking(request, is_number_in_db)

def fermat(a, p):
    return fmod(power(a, p - 1), p) == 1

def fermat_test(number):
    a = 2
    while a < number:
        if not fermat(a, number):
            return (False, 'Falhou em {}'.format(a))
        a += 1
    return (True, '')

class PrimeFermatView(APIView):
    def post(self, request, format=None):
        return primality_base_checking(request, fermat_test)