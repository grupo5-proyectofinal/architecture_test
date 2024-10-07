from django.utils import timezone
from rest_framework import serializers
from .models import Pool, Categoria, Producto, ProductoImagen
from user.serializers import MemberPoolSerializer


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['nombre']


class ProductoImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoImagen
        fields = ['imagen']

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()
    imagenes = ProductoImagenSerializer(many=True, read_only=True)

    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 'cantidad', 'categoria', 'imagenes']


class PoolSerializer(serializers.ModelSerializer):
    producto = serializers.CharField(source='producto.nombre')
    descripcion = serializers.CharField(source='producto.descripcion')
    precio = serializers.DecimalField(source='producto.precio', max_digits=10, decimal_places=2)
    cantidad = serializers.IntegerField(source='producto.cantidad')
    categoria = serializers.CharField(source='producto.categoria.nombre')
    imagenes = serializers.ListField(
        child=serializers.ImageField(), required=False
    )
    
    class Meta:
        model = Pool
        fields = ['id', 'titulo', 'tipo_pago', 'descripcion', 'minimo_participantes', 'producto', 'cantidad_comprada', 'precio', 'cantidad', 'categoria', 'fecha_cierre', 'imagenes']

    def validate_titulo(self, value):
        if not value:
            raise serializers.ValidationError("El título es obligatorio.")
        return value

    def validate_precio(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser un valor positivo.")
        return value

    def validate_minimo_participantes(self, value):
        if value <= 0:
            raise serializers.ValidationError("El mínimo de participantes debe ser mayor que cero.")
        return value

    def validate_fecha_cierre(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError("La fecha de cierre debe ser en el futuro.")
        return value

    def validate(self, data):
        producto_data = data.get('producto')
        if not producto_data:
            raise serializers.ValidationError("El producto es obligatorio.")

        categoria_data = data.get('producto')["categoria"]
        if not categoria_data:
            raise serializers.ValidationError("La categoría es obligatoria.")

        cantidad = data.get('cantidad')
        if cantidad is not None and cantidad <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor que cero.")

        return data

    def create(self, validated_data):
        try:
            imagenes_data = validated_data.pop('imagenes', [])
            producto_data = validated_data.pop('producto')

            categoria_data = producto_data.pop('categoria')

            categoria = Categoria.objects.get(**categoria_data)

            producto = Producto.objects.create(
                categoria=categoria,
                **producto_data
            )

            for imagen_data in imagenes_data:
                ProductoImagen.objects.create(producto=producto, imagen=imagen_data)

            pool = Pool.objects.create(
                producto=producto,
                **validated_data
            )
            return pool
        except Exception as e:
            raise serializers.ValidationError(f"Error al crear el pool: {e}")
                                               
    def update(self, instance, validated_data):
        producto_data = validated_data.pop('producto', None)
        if producto_data:
            categoria_data = producto_data.pop('categoria', None)

            if categoria_data:
                categoria = Categoria.objects.get(**categoria_data)
                instance.producto.categoria = categoria

            for attr, value in producto_data.items():
                setattr(instance.producto, attr, value)
            instance.producto.save()
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
    

class ListPoolSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()
    cantidad_disponible = serializers.SerializerMethodField('get_cantidad_disponible')
    class Meta:
        model = Pool
        fields = ["id", "titulo", "producto", "cantidad_disponible", "cantidad_comprada", "creador", "fecha_cierre", "estado"]


    def get_cantidad_disponible(self, obj):
        return obj.get_available_stock()


class PoolDetailSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()
    cantidad_disponible = serializers.SerializerMethodField('get_cantidad_disponible')
    members = MemberPoolSerializer(many=True, read_only=True)
    class Meta:
        model = Pool
        fields = ['id', 'titulo', 'minimo_participantes', 'producto', 'cantidad_disponible', 'cantidad_comprada', 'tipo_pago', 'creador', 'fecha_creacion', 'fecha_cierre', 'estado', 'members']
    
    def get_cantidad_disponible(self, obj):
        return obj.get_available_stock()
    
    