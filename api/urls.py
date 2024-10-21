from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('api/login/volunteer', views.login, name="login"),
    path('api/register/volunteer', views.register, name="register"),
    path('api/emergency/report', views.make_emergency_report, name="emergency_report"),
    # path('api/emergency/response', views.get_emergency_response, name="emergency_response"),
    path('api/volunteer/accept', views.respond_to_emergency, name="accept_request"),
]
