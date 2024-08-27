from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/pools/', include('pool.urls')),
    path('api/auth/', include('auth.urls')),
    path('api/user/', include('user.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),  # Esquema OpenAPI en JSON
    path('api/docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),  # Interfaz Swagger
    path('api/docs/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),  # Interfaz ReDoc
]
