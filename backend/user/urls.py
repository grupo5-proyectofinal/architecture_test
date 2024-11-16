from django.urls import path
from .views import MeView, MyPoolsView

urlpatterns = [
    path('', MeView.as_view(), name='me'),
    path('pools/', MyPoolsView.as_view(), name='my-pools'),
]