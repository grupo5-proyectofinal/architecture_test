from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from .models import Pool, Categoria, Producto
from .serializers import CreatePoolSerializer, ListPoolSerializer, PoolDetailSerializer
from user.models import Usuario



class PoolListCreateView(generics.ListCreateAPIView):
    queryset = Pool.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListPoolSerializer
        return CreatePoolSerializer

    def perform_create(self, serializer):
        usuario = Usuario.objects.get(username="juan")
        serializer.save(creador=usuario)  # Pasamos el usuario como creador


# Retrieve, update, and delete pool
@api_view(['GET', 'PUT', 'DELETE'])
def pool_detail(request, pk):
    try:
        pool = Pool.objects.get(pk=pk)
    except Pool.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PoolDetailSerializer(pool)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CreatePoolSerializer(pool, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        pool.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class PoolDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pool.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PoolDetailSerializer  # Serializer para ver los detalles del pool
        return CreatePoolSerializer  # Serializer para actualizar el pool

    def perform_update(self, serializer):
        # Puedes agregar lógica adicional si es necesario, como pasar el usuario
        serializer.save()

    def perform_destroy(self, instance):
        # Agrega lógica personalizada para el borrado si es necesario
        instance.delete()