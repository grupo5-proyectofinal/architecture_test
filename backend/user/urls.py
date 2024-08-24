from django.urls import path
from .views import ObtainTokenView, RegisterView

urlpatterns = [
    path('auth/login/', ObtainTokenView.as_view(), name='login'),
    path('auth/register/', RegisterView.as_view(), name='register'),
]