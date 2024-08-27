from django.urls import path
from .views import ObtainTokenView, RegisterView

urlpatterns = [
    path('login/', ObtainTokenView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
]