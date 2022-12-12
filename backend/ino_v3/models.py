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
    Name = models.TextField()
    Username = models.TextField()
    Avatar = models.TextField()
    Email = models.TextField()
    Password = models.TextField()
    Description = models.TextField()
    Phone_no = models.TextField()


class Login(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.TextField()
    Username = models.TextField()
    Avatar = models.TextField()
    Email = models.TextField()
    Description = models.TextField()
    Phone_no = models.TextField()


class Social(models.Model):
    Id = models.AutoField(primary_key=True)
    Username = models.ForeignKey(
        Signup, on_delete=models.CASCADE)
    Instagram = models.URLField(max_length=100)
    Twitter = models.URLField(max_length=100)
    Github = models.URLField(max_length=100)
    LinkedIn = models.URLField(max_length=100)
    Portfolio = models.URLField(max_length=100)
    Other = models.URLField(max_length=100)


class Follow(models.Model):
    id = models.TextField()

    class Meta:
        abstract = True


class FollowForm(forms.ModelForm):
    class Meta:
        model = Follow
        fields = (
            'id',
        )


class Tech(models.Model):
    name = models.TextField()

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
    Title = models.TextField()
    ProjectImage = models.TextField()
    Url = models.TextField()
    Technology = models.ArrayField(
        model_container=Tech,
        model_form_class=TechForm
    )
    Description = models.TextField()
