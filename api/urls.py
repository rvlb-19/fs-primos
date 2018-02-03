from django.urls import path

from .views import PrimeView, PrimeDBView

app_name = 'api'

urlpatterns = [
    path('calculate_prime', PrimeView.as_view(), name='calculate_prime'),
    path('get_prime_from_db', PrimeDBView.as_view(), name='get_prime_from_db'),
]