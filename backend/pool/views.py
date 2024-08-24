from django.shortcuts import render

# Create your views here.
class PoolCreateView(generics.CreateAPIView):
    queryset = Pool.objects.all()
    serializer_class = PoolSerializer
    permission_classes = [IsAuthenticated]  # Requiere autenticación

    def perform_create(self, serializer):
        # El creador será el usuario autenticado
        serializer.save(creador=self.request.user)