from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    GENDER_IN_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    gender = models.CharField(max_length=6, choices=GENDER_IN_CHOICES, null=True, blank=True)
    foto = models.ImageField(upload_to='fotos_perfil/', blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True, unique=True)
    direccion = models.CharField(max_length=250)
    country = models.CharField(max_length=120, null=True, blank=True)
    city = models.CharField(max_length=120, null=True, blank=True)
    
    def str(self):
        return self.username
