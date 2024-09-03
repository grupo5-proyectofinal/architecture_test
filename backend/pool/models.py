from django.db import models
from user.models import Usuario

# Create your models here.
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre
    
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.IntegerField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)


    def __str__(self):
        return self.nombre
    

class ProductoImagen(models.Model):
    producto = models.ForeignKey(Producto, related_name='imagenes', on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='productos/')

    def __str__(self):
        return f"Imagen de {self.producto.nombre}"
    
    
class Pool(models.Model):
    ESTADO_CHOICES = [
        ('abierto', 'Abierto'),
        ('listo', 'Listo'),
        ('en_curso', 'En Curso'),
        ('finalizado', 'Finalizado'),
        ('cancelado', 'Cancelado'),
    ]
    PAGO_CHOICES = [
        ('efectivo', 'Efectivo'),
        ('tarjeta', 'Tarjeta'),
        ('transferencia', 'Transferencia'),
        ('todos', 'Todos'),
    ]

    titulo = models.CharField(max_length=100)
    minimo_participantes = models.IntegerField(default=1)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    creador = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_cierre = models.DateTimeField()
    
    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default='abierto'
    )
    tipo_pago = models.CharField(
        max_length=20,
        choices=PAGO_CHOICES,
        default='todos'
    )

    def __str__(self):
        return self.titulo



    

