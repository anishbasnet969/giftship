from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, RetrieveDestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from products.models import Product,Category
from products.serializers import ProductSerializer,CategorySerializer,ProductCreateSerializer

class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class VendorProductList(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request):
       seralizer = ProductSerializer(Product.objects.filter(vendor=request.user), many=True)
       return Response(seralizer.data)

class NewProductsView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.order_by('-id')[:2]

class ProductDetailView(RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class CategoryView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class ProductCreateView(APIView):
    permission_classes = [IsAuthenticated,]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        product_serializer = ProductCreateSerializer(data=request.data)
        if product_serializer.is_valid():
            product_serializer.save()
            return Response(product_serializer.data, status=status.HTTP_201_CREATED)
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductEditView(UpdateAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = ProductCreateSerializer
    queryset = Product.objects.all()

class ProductDeleteView(RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = ProductCreateSerializer
    queryset = Product.objects.all()