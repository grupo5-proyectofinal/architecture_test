from django.urls import path
from .views import PoolDetailUpdateDeleteView, PoolListCreateView

urlpatterns = [
    path('', PoolListCreateView.as_view(), name='pool-list-create'),
    path('<int:pk>/', PoolDetailUpdateDeleteView.as_view(), name='pool-detail'),
]