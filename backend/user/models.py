from django.contrib.auth.models import AbstractUser
from django.db import models

from pool.models import Pool


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
    
    def is_member_of(self, pool: Pool) -> bool:
        return self.memberships.filter(pool=pool).exists()


class Member(models.Model):
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='memberships')
    pool = models.ForeignKey("pool.Pool", on_delete=models.CASCADE, related_name='members')
    joined_at = models.DateTimeField(auto_now_add=True)
    product_quantity = models.IntegerField()
    
    class Meta:
        unique_together = ('user', 'pool')

    def __str__(self):
        return f"{self.user} - {self.pool}"
    
    