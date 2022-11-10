from rest_framework import serializers
from ino_v3.models import Signup, Login


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signup
        fields = ("Id", "Name", "Username", "Avatar",
                  "Email", "Password", "Description")


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ("Id", "Name", "Username", "Avatar", "Email", "Description")
