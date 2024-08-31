from rest_framework import generics
from .serializers import CreatePoolSerializer, ListPoolSerializer, PoolDetailSerializer
from .models import Pool
from django.contrib.auth import get_user_model

User = get_user_model()


class PoolListCreateView(generics.ListCreateAPIView):
    queryset = Pool.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListPoolSerializer
        return CreatePoolSerializer

    def perform_create(self, serializer):
        usuario = User.objects.get(username="juan")
        serializer.save(creador=usuario)  

    
class PoolDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pool.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PoolDetailSerializer  
        return CreatePoolSerializer 

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()