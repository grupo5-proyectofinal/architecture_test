from django.urls import path
from .views import PoolDetailUpdateDeleteView, PoolListCreateView

urlpatterns = [
    path('pools/', PoolListCreateView.as_view(), name='pool-list-create'),
    path('pools/<int:pk>/', PoolDetailUpdateDeleteView.as_view(), name='pool-detail'),
]