from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class ObtainTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Solo se permite escribir el password, no leerlo

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password', 'gender', 'foto', 'phone_number',
            'direccion', 'country', 'city', 'first_name', 'last_name'
        ]
        read_only_fields = ['id']

    def create(self, validated_data):
        # Extraemos el password y eliminamos de los datos para manejarlo manualmente
        password = validated_data.pop('password')
        # Crear el usuario con los otros datos
        user = super().create(validated_data)
        # Establecer el password usando el método set_password para encriptarlo
        user.set_password(password)
        user.save()
        return user