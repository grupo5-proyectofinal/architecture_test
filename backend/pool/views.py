from django.shortcuts import get_object_or_404
from user.models import Member
from rest_framework.views import APIView
from user.serializers import MemberSerializer
from .serializers import CategoriaSerializer, PoolSerializer, ListPoolSerializer, PoolDetailSerializer
from .models import Categoria, Pool
from django.contrib.auth import get_user_model
from rest_framework import permissions, generics, serializers, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
import logging

logger = logging.getLogger(__name__)

class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny] 

class PoolListCreateView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):
        pools = Pool.objects.all()

        producto = request.query_params.get('producto')
        creador = request.query_params.get('creador')
        categoria = request.query_params.get('categoria')

        if producto:
            pools = pools.filter(producto__nombre__icontains=producto)
        if creador:
            pools = pools.filter(creador__username__icontains=creador)
        if categoria:
            pools = pools.filter(producto__categoria__nombre__icontains=categoria)
            
        serializer = ListPoolSerializer(pools, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = PoolSerializer(data=request.data)
        try:
            User = get_user_model()
            usuario = User.objects.get(username="juan")
            serializer.is_valid(raise_exception=True)
            serializer.save(creador=usuario)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except User.DoesNotExist as e:
            logger.error("El usuario no existe.")
            return Response(
                {"detail": f"Usuario no encontrado: {str(e)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            logger.error(f"Error al crear el Pool: {str(e)}")
            return Response(
                {"detail": f"Error desconocido al crear el Pool: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



class PoolDetailUpdateDeleteView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        return get_object_or_404(Pool, pk=pk)

    def get(self, request, pk, format=None):
        pool = self.get_object(pk)
        serializer = PoolDetailSerializer(pool)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        pool = self.get_object(pk)
        serializer = PoolSerializer(pool, data=request.data, partial=True)  # partial=True para permitir actualizaciones parciales
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        pool = self.get_object(pk)
        serializer = PoolSerializer(pool, data=request.data, partial=True)  # partial=True para permitir actualizaciones parciales
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        """
        Maneja la eliminación de un Pool específico.
        """
        pool = self.get_object(pk)
        pool.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
        

        
class LeavePoolView(generics.GenericAPIView):
    serializer_class = MemberSerializer
    permission_classes = [permissions.AllowAny]


    def post(self, request, *args, **kwargs):
        User = get_user_model()
        usuario = User.objects.get(username="juan")  # Adjust to get the authenticated user
        pool_id = self.kwargs.get('pk')
        pool = Pool.objects.get(id=pool_id)

        try:
            breakpoint()
            member = Member.objects.get(user=usuario, pool=pool)
            pool.update_stock(-member.product_quantity)
            member.delete()

            return Response({"message": "Has dejado el pool con éxito."}, status=200)

        except Member.DoesNotExist:
            raise ValidationError({"error": "El usuario no es miembro de este pool."})
        except Pool.DoesNotExist:
            raise ValidationError({"error": "El pool no existe."})

