from django.contrib.auth.models import AbstractUser
from django.db import models



class Usuario(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    foto = models.ImageField(upload_to='fotos_perfil/', blank=True, null=True)
    direccion = models.CharField(max_length=250)
    contrasena = models.CharField(max_length=128)

    
    def str(self):
        return self.username
