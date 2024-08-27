from rest_framework import permissions, views, status
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from django.contrib.auth import get_user_model
from .serializers import UsuarioSerializer

User = get_user_model()

class MeView(RetrieveAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.serializer_class(user)
        return Response(serializer.data)

