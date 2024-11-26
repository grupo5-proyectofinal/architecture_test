from django.urls import path
from .views import PoolDetailUpdateDeleteView, PoolListCreateView, CategoriaListCreateView, JoinPoolView, LeavePoolView

urlpatterns = [
    path('pools/', PoolListCreateView.as_view(), name='pool-list-create'),
    path('pools/<int:pk>/', PoolDetailUpdateDeleteView.as_view(), name='pool-detail'),
    path('pools/<int:pk>/join/', JoinPoolView.as_view(), name='join-pool'),
    path('pools/<int:pk>/leave/', LeavePoolView.as_view(), name='leave-pool'),
    path('categories/', CategoriaListCreateView.as_view(), name='categories-list'),
]
