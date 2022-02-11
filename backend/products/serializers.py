from unicodedata import category
from rest_framework import serializers
from products.models import Category, Product
from users.models import CustomUser
from users.serializers import VendorSerializer

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id','name')

class ProductVendorSerializer(serializers.ModelSerializer):
    vendor_profile = VendorSerializer(required=False)

    class Meta:
        model = CustomUser
        fields = ('email', 'vendor_profile')       

class ProductSerializer(serializers.ModelSerializer):
    vendor = ProductVendorSerializer()
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'picture', 'price', 'vendor', 'category', )


class ProductCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'picture', 'price', 'vendor', 'category', )