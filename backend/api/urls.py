from django.urls import path, include
from knox import views as knox_views
from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'worlds', views.WorldViewSet)
router.register(r'continents', views.ContinentViewSet)

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('', include(router.urls)),
]
