from django.contrib.auth.models import Group, User
from rest_framework import serializers

from api.models import World, Continent


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class WorldSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = World
        fields = ['name', 'description', 'slug']
    
    def create(self, validated_data):
        return World.objects.create(**validated_data)


class ContinentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Continent
        fields = ['name', 'world', 'description']
