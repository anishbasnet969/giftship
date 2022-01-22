from django.db import models
from users.models import CustomUser

class VendorProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='vendor_profile')
    user_name = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=150, unique=False)
    phone_number = models.CharField(max_length=10, unique=True, null=False, blank=False)
    product_count = models.IntegerField(default=0)

    def __str__(self):
        return self.user_name

    class Meta:
        db_table = 'vendorProfile'

class CustomerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='customer_profile')
    user_name = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=150, unique=False)
    orders_placed = models.IntegerField(default=0)

    def __str__(self):
        return self.user_name

    class Meta:
        db_table = 'customerProfile'