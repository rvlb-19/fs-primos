from django.urls import path

from .views import PrimeView

app_name = 'api'

urlpatterns = [
    path('calculate_prime', PrimeView.as_view(), name='calculate_prime'),
]