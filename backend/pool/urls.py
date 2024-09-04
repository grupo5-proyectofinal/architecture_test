from django.urls import path
from .views import PoolDetailUpdateDeleteView, PoolListCreateView, CategoriaListView

urlpatterns = [
    path('pools/', PoolListCreateView.as_view(), name='pool-list-create'),
    path('pools/<int:pk>/', PoolDetailUpdateDeleteView.as_view(), name='pool-detail'),
    path('categorias/', CategoriaListView.as_view(), name='list-categorias'),
]
