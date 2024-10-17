from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('api/login/volunteer', views.login, name="login"),
    path('api/register/volunteer', views.register, name="register"),
]
