from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Category(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name

class Product(models.Model):

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)
    name = models.CharField(max_length=150)
    description = models.TextField()
    picture = models.ImageField(upload_to='product_images', default='defaultgiftlogo.jpg')
    vendor = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.IntegerField()

    def __str__(self):
        return self.name
