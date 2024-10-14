from os import name
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index.as_view(), name="index"),
]
