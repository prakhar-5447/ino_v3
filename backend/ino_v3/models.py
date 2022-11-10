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
    Email = models.CharField(max_length=50)
    Password = models.CharField(max_length=16)


class Login(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=30)
    Username = models.CharField(max_length=30)
    Email = models.CharField(max_length=50)


# class Tech(models.Model):
#     name = models.CharField(max_length=20)

#     class Meta:
#         abstract = True


# class TechForm(forms.ModelForm):
#     class Meta:
#         model = Tech
#         fields = (
#             'name',
#         )


# class Step(models.Model):
#     title = models.CharField(max_length=100)

#     class Meta:
#         abstract = True


# class StepForm(forms.ModelForm):
#     class Meta:
#         model = Step
#         fields = ('title',)


# class AcceptChallenge(models.Model):
#     Id = models.AutoField(primary_key=True)
#     Name = models.CharField(max_length=30)
#     Description = models.CharField(max_length=50)
#     Difficulty_level = models.CharField(max_length=10)
#     ProjectImage = models.CharField(max_length=100)
#     CurrentTask = models.IntegerField(default=0)
#     Challenge = models.ForeignKey(
#         Challenge, on_delete=models.CASCADE)
#     Username = models.ForeignKey(
#         Signup, on_delete=models.CASCADE)
#     AcceptedDate = models.DateTimeField(default=datetime.now, blank=True)
#     Url = models.CharField(max_length=50)
#     Technology = models.ArrayField(
#         model_container=Tech,
#         model_form_class=TechForm
#     )
#     Progress = models.ArrayField(
#         model_container=Step,
#         model_form_class=StepForm
#     )
