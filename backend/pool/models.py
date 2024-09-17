from django.db import models

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
    
    class EstadoChoices(models.TextChoices):
        ABIERTO = 'abierto', ('Abierto')
        LISTO = 'listo', ('Listo')
        EN_CURSO = 'en_curso', ('En Curso')
        FINALIZADO = 'finalizado', ('Finalizado')
        CANCELADO = 'cancelado', ('Cancelado')

    class PagoChoices(models.TextChoices):
        EFECTIVO = 'efectivo', ('Efectivo')
        TARJETA = 'tarjeta', ('Tarjeta')
        TRANSFERENCIA = 'transferencia', ('Transferencia')
        TODOS = 'todos', ('Todos')


    titulo = models.CharField(max_length=100)
    minimo_participantes = models.IntegerField(default=1)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='pools')
    cantidad_comprada = models.IntegerField()
    creador = models.ForeignKey("user.Usuario", on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_cierre = models.DateTimeField()
    
    estado = models.CharField(
        max_length=20,
        choices=EstadoChoices.choices,
        default=EstadoChoices.ABIERTO
    )
    tipo_pago = models.CharField(
        max_length=20,
        choices=PagoChoices.choices,
        default=PagoChoices.TODOS
    )

    def __str__(self):
        return self.titulo


    def is_open(self):
        return self.estado == self.EstadoChoices.ABIERTO

    def update_stock(self, cantidad: int):
        cant_productos = self.get_available_stock()
        if cant_productos - cantidad >= 0:
            self.cantidad_comprada+=cantidad
            self.save()
        else:
            raise ValueError("No hay suficientes productos en stock.")

    def get_available_stock(self):
        return self.producto.cantidad - self.cantidad_comprada
    
    
