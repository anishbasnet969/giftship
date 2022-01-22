from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from userprofile.models import VendorProfile, CustomerProfile

class VendorProfileView(RetrieveAPIView):

    permission_classes = [IsAuthenticated,]

    def get(self, request):
        
        try:
            vend_profile = VendorProfile.objects.get(user=request.user)
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'Vendor profile fetched successfully',
                'data': {
                    'user_name': vend_profile.user_name,
                    'full_name': vend_profile.full_name,
                    'phone_number': vend_profile.phone_number,
                    'product_count': vend_profile.product_count,
                    },
                }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'Vendor Profile does not exist.',
                'error': str(e)
                }
        return Response(response, status=status_code)


class CustomerProfileView(RetrieveAPIView):

    permission_classes = [IsAuthenticated,]

    def get(self, request):

        try:
            cust_profile = CustomerProfile.objects.get(user=request.user)
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'Customer profile fetched successfully',
                'data': {
                    'user_name': cust_profile.user_name,
                    'full_name': cust_profile.full_name,
                    'orders_placed': cust_profile.orders_placed,
                    },
                }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'Customer Profile does not exist.',
                'error': str(e)
                }
        return Response(response, status=status_code)