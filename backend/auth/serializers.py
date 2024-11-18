from rest_framework import serializers

class ObtainTokenSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

class TokenValidationSerializer(serializers.Serializer):
    token = serializers.CharField(required=True, help_text="JWT token to validate")