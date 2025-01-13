from django.db import models


# World Model
class World(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	slug = models.SlugField(max_length=100, unique=True)

	def __str__(self):
		return self.name


# Continent Model
class Continent(models.Model):
	name = models.CharField(max_length=100)
	world = models.ForeignKey(World, on_delete=models.CASCADE)
	description = models.TextField()

	def __str__(self):
		return self.name
