from user.serializers import MemberSerializer
from .serializers import CategoriaSerializer, PoolSerializer, ListPoolSerializer, PoolDetailSerializer
from .models import Categoria, Pool
from django.contrib.auth import get_user_model
from rest_framework import permissions, generics, serializers
import logging

logger = logging.getLogger(__name__)

class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny] 

class PoolListCreateView(generics.ListCreateAPIView):
    queryset = Pool.objects.all()
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListPoolSerializer
        return PoolSerializer

    def perform_create(self, serializer):
        try:
            User = get_user_model()
            usuario = User.objects.get(username="juan")
            serializer.is_valid(raise_exception=True)
            serializer.save(creador=usuario)  
        
        except User.DoesNotExist as e:
            logger.error("El usuario no existe.")
            raise serializers.ValidationError(f"{e}", code='invalid')
        
        except Exception as e:
            logger.error(f"Error al crear el Pool: {str(e)}")
            raise serializers.ValidationError(f"{e}", code='invalid')


class PoolDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pool.objects.all()
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PoolDetailSerializer  
        return PoolSerializer 

    def perform_update(self, serializer):
        serializer.save(partial=True)

    def perform_destroy(self, instance):
        instance.delete()


class JoinPoolView(generics.CreateAPIView):
    serializer_class = MemberSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        try:
            User = get_user_model()
            usuario = User.objects.get(username="juan")

            pool_id = self.kwargs.get('pk')
            pool = Pool.objects.get(id=pool_id)

            if serializer.is_valid(raise_exception=True):
                serializer.save(user=usuario, pool=pool)

        except Exception as e:
            logger.error(f"Error al crear el Pool: {str(e)}")
            raise serializers.ValidationError(f"{e}", code='invalid')