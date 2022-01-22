from django.urls import path
from users.views import (
    VendorRegistrationView,
    CustomerRegistrationView,
    UserLogoutView
)    

urlpatterns = [
    path('create-vendor/', VendorRegistrationView.as_view(), name='create_vendor'),
    path('create-customer/', CustomerRegistrationView.as_view(), name='create_customer'),
    path('logout/', UserLogoutView.as_view(), name='logout_user'),
]
