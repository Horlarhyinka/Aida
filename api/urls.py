from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('login/volunteer', views.login, name="login"),
    path('register/volunteer', views.register, name="register"),
    path('emergency/report', views.make_emergency_report, name="emergency_report"),
    path('emergency/<str:emergency_id>', views.get_emergency_report, name="emergency_response"),
    path('emergency/ai/<str:emergency_id>', views.ai_response, name='ai_response>'),    
    path('volunteer/accept/<str:emergency_id>', views.respond_to_emergency, name="accept_request"),
    path('responders/<str:emergency_id>', views.responders_list, name="responders_list"),
    path('chat/messages/<str:emergency_id>', views.chat_messages.as_view(), name="chat_messages"),
]
