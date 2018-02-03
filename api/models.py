from django.db import models

class PrimeNumber(models.Model):
    number = models.CharField(max_length=1000)