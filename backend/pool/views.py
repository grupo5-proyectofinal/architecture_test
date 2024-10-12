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
            # Guardar el objeto con el creador asignado
            serializer.save(creador=usuario)
        
        except User.DoesNotExist as e:
            # Error si el usuario no existe
            logger.error("El usuario no existe.")
            print(f"Error de usuario: {str(e)}")  # Imprime en consola
            raise serializers.ValidationError(f"Usuario no encontrado: {str(e)}", code='invalid')

        except Exception as e:
            # Capturar cualquier otro error y mostrarlo con detalles
            logger.error(f"Error al crear el Pool: {str(e)}")
            print(f"Error al crear el Pool: {str(e)}")  # Imprime en consola
            raise serializers.ValidationError(f"Error desconocido al crear el Pool: {str(e)}", code='invalid')


class PoolDetailUpdateDeleteView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        return get_object_or_404(Pool, pk=pk)

    def get(self, request, pk, format=None):
        pool = self.get_object(pk)
        serializer = PoolDetailSerializer(pool)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        """
        Maneja la actualización completa o parcial de un Pool específico.
        Utiliza PoolSerializer para deserializar y validar los datos.
        """
        pool = self.get_object(pk)
        serializer = PoolSerializer(pool, data=request.data, partial=True)  # partial=True para permitir actualizaciones parciales
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        """
        Maneja la actualización parcial de un Pool específico.
        Utiliza PoolSerializer para deserializar y validar los datos.
        """
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
