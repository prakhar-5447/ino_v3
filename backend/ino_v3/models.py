from django import forms
from djongo import models
from datetime import datetime
from django.conf import settings

# Add the import for GridFSStorage
from djongo.storage import GridFSStorage

# Define your GrifFSStorage instance
grid_fs_storage = GridFSStorage(
    collection='myfiles', base_url=''.join([str(settings.BASE_DIR), 'myfiles/']))

# Create your models here.


class Signup(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=30)
    Username = models.CharField(max_length=30)
    Avatar = models.CharField(max_length=50)
    Email = models.CharField(max_length=50)
    Password = models.CharField(max_length=16)
    Description = models.CharField(max_length=100)


class Login(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=30)
    Username = models.CharField(max_length=30)
    Avatar = models.CharField(max_length=50)
    Email = models.CharField(max_length=50)
    Description = models.CharField(max_length=100)


class Social(models.Model):
    Id = models.AutoField(primary_key=True)
    Username = models.ForeignKey(
        Signup, on_delete=models.CASCADE)
    Instagram = models.CharField(max_length=100)
    Twitter = models.CharField(max_length=100)
    Github = models.CharField(max_length=100)
    LinkedIn = models.CharField(max_length=100)
    Portfolio = models.CharField(max_length=100)
    Other = models.CharField(max_length=100)


class Follow(models.Model):
    id = models.CharField(max_length=3)

    class Meta:
        abstract = True


class FollowForm(forms.ModelForm):
    class Meta:
        model = Follow
        fields = (
            'id',
        )


class Tech(models.Model):
    name = models.CharField(max_length=20)

    class Meta:
        abstract = True


class TechForm(forms.ModelForm):
    class Meta:
        model = Tech
        fields = (
            'name',
        )


class Followed(models.Model):
    Id = models.AutoField(primary_key=True)
    Username = models.ForeignKey(
        Signup, on_delete=models.CASCADE)
    Followed = models.ArrayField(
        model_container=Follow,
        model_form_class=FollowForm
    )


class Project(models.Model):
    Id = models.AutoField(primary_key=True)
    Username = models.ForeignKey(
        Signup, on_delete=models.CASCADE)
    Title = models.CharField(max_length=20)
    ProjectImage = models.CharField(max_length=50)
    Url = models.CharField(max_length=50)
    Technology = models.ArrayField(
        model_container=Tech,
        model_form_class=TechForm
    )
    Description = models.CharField(max_length=100)
