from .serializers import CategoriaSerializer, PoolSerializer, ListPoolSerializer, PoolDetailSerializer
from .models import Categoria, Pool
from django.contrib.auth import get_user_model
from rest_framework import permissions, generics


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
        User = get_user_model()
        usuario = User.objects.get(username="juan")
        serializer.save(creador=usuario)  



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