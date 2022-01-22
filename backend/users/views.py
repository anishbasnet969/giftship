from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from users.serializers import ( 
    VendorRegistrationSerializer,
    CustomerRegistrationSerializer,
    UserLoginSerializer
)

class VendorRegistrationView(CreateAPIView):

    serializer_class = VendorRegistrationSerializer
    permission_classes = [AllowAny,]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            status_code = status.HTTP_201_CREATED
            response = {
                'success' : 'True',
                'status code' : status_code,
                'message': 'Vendor registered successfully',
                }
            return Response(response, status=status_code)
        
        status_code = status.HTTP_400_BAD_REQUEST

        return Response(serializer.errors, status=status_code)


class CustomerRegistrationView(CreateAPIView):

    serializer_class = CustomerRegistrationSerializer
    permission_classes = [AllowAny,]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            status_code = status.HTTP_201_CREATED
            response = {
                'success' : 'True',
                'status code' : status_code,
                'message': 'Customer registered successfully',
                }
            return Response(response, status=status_code)
        
        status_code = status.HTTP_400_BAD_REQUEST

        return Response(serializer.errors, status=status_code)


class UserLoginView(RetrieveAPIView):

    permission_classes = [AllowAny,]
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            auth_data = serializer.validate(data=request.data)
            status_code = status.HTTP_200_OK
            response = {
                'success' : 'True',
                'status code' : status_code,
                'message': 'User logged in  successfully',
                'email': auth_data['email'],
                'is_vendor': auth_data['is_vendor'],
                'refresh' : auth_data['refresh'],
                'access' : auth_data['access'],
            }

            return Response(response, status=status_code)

        status_code = status.HTTP_400_BAD_REQUEST

        return Response(serializer.errors, status=status_code)


class UserLogoutView(APIView):
    permission_classes = [AllowAny,]

    def post(self,request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)