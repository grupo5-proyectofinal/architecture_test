from django.urls import path
from .views import pool_detail, pool_list_create

urlpatterns = [
    path('pools/', pool_list_create, name='pool-list-create'),
    path('pools/<int:pk>/', pool_detail, name='pool-detail'),
]