from rest_framework import serializers
from ino_v3.models import Signup, Login, Social, Followed, Project


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signup
        fields = ("Id", "Name", "Username", "Avatar",
                  "Email", "Password", "Description","Phone_no")


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ("Id", "Name", "Username", "Avatar", "Email", "Description","Phone_no")


class SocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Social
        fields = ("Id", "Username", "Instagram", "Twitter",
                  "Github", "LinkedIn", "Portfolio", "Other")


class FollowedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followed
        fields = ("Id", "Username", "Followed")


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ("Id", "Username", "Title", "ProjectImage",
                  "Url", "Technology", "Description")
