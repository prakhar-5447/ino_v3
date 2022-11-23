from django.urls import re_path as url
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from ino_v3 import views


urlpatterns = [
    url(r'^signup$', views.signupApi),
    url(r'^login$', views.loginApi),
    path('user/<str:username>', views.userApi),
    path('userId/<str:id>', views.userApi),
    url(r'^upload$', views.uploadApi),
    path('upload/<str:name>', views.uploadApi),
    url(r'^social$', views.socialApi),
    path('social/<str:userId>', views.socialApi),
    url(r'^follow$', views.followApi),
    path('follow/<str:userId>', views.followApi),
    url(r'^project$', views.projectApi),
    path('project/<str:userId>', views.projectApi),
    path('project/<str:userId>/<str:id>', views.projectApi),
    path('username/<str:username>', views.searchByUsernameApi),
    path('name/<str:name>', views.searchByNameApi),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
