from rest_framework import serializers
from .models import Pool, Categoria, Producto
from user.models import Usuario


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['nombre', 'descripcion']


class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()  # Anidamos el serializer de Categoria

    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 'cantidad', 'categoria']


class CreatePoolSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer() 
    class Meta:
        model = Pool
        fields = ["titulo", "descripcion", "minimo_participantes", "producto", "fecha_cierre"]

    def create(self, validated_data):
        # Esta lógica puede quedar aquí o puede estar en la vista
        return super().create(validated_data)


class ListPoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pool
        fields = ["id", "titulo", "minimo_participantes", "producto", "creador", "fecha_creacion", "fecha_cierre", "estado"]


class PoolDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pool
        fields = '__all__'