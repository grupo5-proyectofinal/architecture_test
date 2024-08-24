from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Pool, Categoria, Producto
from .serializers import CreatePoolSerializer, ListPoolSerializer, PoolDetailSerializer
from user.models import Usuario


@api_view(['GET', 'POST'])
def pool_list_create(request):
    if request.method == 'GET':
        pools = Pool.objects.all()
        serializer = ListPoolSerializer(pools, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        usuario = Usuario.objects.get(username="juan")
        serializer = CreatePoolSerializer(data=request.data)
        if serializer.is_valid():
            breakpoint()
            producto_data = serializer.validated_data['producto']
            categoria_data = producto_data['categoria']

            # Crear la categoría si no existe
            categoria, created = Categoria.objects.get_or_create(**categoria_data)

            producto = Producto.objects.create(
                nombre=producto_data['nombre'],
                descripcion=producto_data['descripcion'],
                precio=producto_data['precio'],
                cantidad=producto_data['cantidad'],
                categoria=categoria
            )
            
            # Guardar el pool con el creador y el producto
            pool = serializer.save(creador=usuario, producto=producto)
            return Response(CreatePoolSerializer(pool).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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