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
        user = serializer.save()
        jwt_token = JWTAuthentication.create_jwt(user)
        self.token = jwt_token
        self.user = user

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        user_serializer = self.get_serializer(self.user)

        response.data = {
            'token': self.token,
            'user': user_serializer.data
        }

        return response


class ValidateTokenView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        
        if not token:
            return Response({'message': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = JWTAuthentication.decode_jwt(token)
            return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Token is invalid', 'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)