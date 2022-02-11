from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from userprofile.models import VendorProfile, CustomerProfile
from users.models import CustomUser

class VendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorProfile
        fields = ('user_name', 'full_name', 'phone_number')


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerProfile
        fields = ('user_name', 'full_name')


class VendorRegistrationSerializer(serializers.ModelSerializer):

    profile = VendorSerializer(required=False)

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = CustomUser.objects.create_user(**validated_data, is_vendor=True)
        VendorProfile.objects.create(
            user=user,
            user_name=profile_data['user_name'],
            full_name=profile_data['full_name'],
            phone_number=profile_data['phone_number'],
        )
        return user


class CustomerRegistrationSerializer(serializers.ModelSerializer):

    profile = CustomerSerializer(required=False)

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = CustomUser.objects.create_user(**validated_data)
        CustomerProfile.objects.create(
            user=user,
            user_name=profile_data['user_name'],
            full_name=profile_data['full_name'],
        )
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password is not found.'
            )

        try:
            refresh = RefreshToken.for_user(user)
            update_last_login(None, user)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        
        return {
            'email': user.email,
            'id': user.id,
            'is_vendor': user.is_vendor,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }