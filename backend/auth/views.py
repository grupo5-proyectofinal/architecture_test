from django.contrib.auth import get_user_model
from rest_framework import views, permissions, status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import ObtainTokenSerializer
from user.serializers import UsuarioSerializer
from .auth import JWTAuthentication

User = get_user_model()


class ObtainTokenView(views.APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ObtainTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        user = User.objects.filter(email=email).first()
        
        if user is None or not user.check_password(password):
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        jwt_token = JWTAuthentication.create_jwt(user)

        return Response({'token': jwt_token})
    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save()