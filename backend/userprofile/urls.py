from django.urls import path
from userprofile.views import VendorProfileView, CustomerProfileView

urlpatterns = [
    path('vendor-profile/', VendorProfileView.as_view(), name='create_vendor'),
    path('customer-profile/', CustomerProfileView.as_view(), name='create_customer'),
]