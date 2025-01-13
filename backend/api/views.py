from django.contrib.auth import login
from django.contrib.auth.models import Group, User
from knox.views import LoginView as KnoxLoginView
from rest_framework import permissions, viewsets, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response

from api.models import Continent, World
from api.serializers import GroupSerializer, UserSerializer, \
    ContinentSerializer, WorldSerializer


class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        response = super(LoginView, self).post(request, format=None)
        response.data['username'] = user.username
        return response


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class WorldViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows worlds to be viewed or edited.
    """
    queryset = World.objects.all().order_by('name')
    serializer_class = WorldSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = WorldSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ContinentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows continents to be viewed or edited.
    """
    queryset = Continent.objects.all().order_by('name')
    serializer_class = ContinentSerializer
    permission_classes = [permissions.IsAuthenticated]
