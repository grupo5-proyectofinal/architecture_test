from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password', 'gender', 'foto', 'phone_number',
            'direccion', 'country', 'city', 'first_name', 'last_name'
        ]
        read_only_fields = ['id']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user