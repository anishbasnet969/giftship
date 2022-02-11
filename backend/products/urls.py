from django.urls import path
from products.views import (
    ProductListView,
    VendorProductList,
    ProductDetailView,
    NewProductsView,
    ProductCreateView,
    CategoryView,
    ProductEditView,
    ProductDeleteView
)

urlpatterns = [
    path('', ProductListView.as_view(), name='product_list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product_detail'),
    path('categories/', CategoryView.as_view(), name='categories'),
    path('vendor/items/', VendorProductList.as_view(), name='vendor_items'),
    path('recent/', NewProductsView.as_view(), name='product_recently_added'),
    path('create/', ProductCreateView.as_view(), name='product_create'),
    path('edit/<int:pk>/', ProductEditView.as_view(), name='product_edit'),
    path('delete/<int:pk>/', ProductDeleteView.as_view(), name='product_delete')
]