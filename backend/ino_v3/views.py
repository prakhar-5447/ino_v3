from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.files.storage import default_storage
from django.http import FileResponse

from ino_v3.models import Signup, Login, Social, Followed, Project
from ino_v3.serializers import SignupSerializer, LoginSerializer, SocialSerializer, FollowedSerializer, ProjectSerializer

# Create your views here.


@csrf_exempt
def signupApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        UserData = Signup.objects.filter(
            Username=reqData["Username"], Email=reqData["Email"])
        if UserData:
            return JsonResponse({'success': False, 'msg': "User with same Username and Email Exist"})
        UserData = Signup.objects.filter(Email=reqData["Email"])
        if UserData:
            return JsonResponse({'success': False, 'msg': "User with same Email Exist"})
        UserData = Signup.objects.filter(Username=reqData["Username"])
        if UserData:
            return JsonResponse({'success': False, 'msg': "User with same Username Exist"})
        Signup_serializer = SignupSerializer(data=reqData)
        if Signup_serializer.is_valid():
            Signup_serializer.save()
            return JsonResponse({'success': True, 'msg': "Signup Sucessfully"})
        return JsonResponse({'success': False, 'msg': "Failed to Create Account"})


@csrf_exempt
def loginApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        UserData = Signup.objects.filter(
            Email=reqData["Email"]).values()
        if UserData:
            if UserData[0]['Password'] == reqData["Password"]:
                Login_serializer = LoginSerializer(data=UserData[0])
                if Login_serializer.is_valid():
                    return JsonResponse({'success': True, 'msg': Login_serializer.data["Username"]})
                return JsonResponse({'success': False, 'msg': "Failed"})
            return JsonResponse({'success': False, 'msg': "Incorrect Password"})
        else:
            return JsonResponse({'success': False, 'msg': "User not Exist"})
    return JsonResponse({'success': False, 'msg': "User not Exist"})


@csrf_exempt
def userApi(request, username="", id=0):
    if request.method == "GET":
        if(username):
            UserData = Signup.objects.filter(
                Username=username)
        elif(id):
            UserData = Signup.objects.filter(
                Id=id)
        if UserData:
            Login_serializer = LoginSerializer(UserData[0])
            return JsonResponse({'success': True, 'msg': Login_serializer.data})
        return JsonResponse({'success': False, 'msg': "User not Exist"})


@csrf_exempt
def uploadApi(request, name=''):
    if request.method == "POST":
        file_data = request.FILES["file"]
        filename = default_storage.save(file_data.name, file_data)
        return JsonResponse({"msg": filename})
    elif request.method == "GET":
        img = open('./Photos/' + name, 'rb')
        response = FileResponse(img)
        return response


@csrf_exempt
def socialApi(request, userId=0):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        socailData = Social.objects.filter(Username_id=reqData["Username"])
        if socailData:
            return JsonResponse({'success': False, 'msg': "Social Already Exist"})
        social_serializer = SocialSerializer(data=reqData)
        if social_serializer.is_valid():
            social_serializer.save()
            return JsonResponse({'success': True, 'msg': "Social Added Successfully"})
        return JsonResponse({'success': False, 'msg': "Failed"})
    elif request.method == "GET":
        socailData = Social.objects.filter(Username_id=userId)
        if socailData:
            social_serializer = SocialSerializer(socailData, many=True)
            return JsonResponse({'success': True, 'msg': social_serializer.data})
        return JsonResponse({'success': False, 'msg': "Social Not Found"})
    elif request.method == "PUT":
        reqData = JSONParser().parse(request)
        Username = Signup.objects.filter(
            Id=userId)
        if not Username:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
        socialData = Social.objects.filter(
            Username_id=userId, Id=reqData["Id"])
        if socialData:
            newSocial = {
                "Instagram": reqData["Instagram"],
                "Twitter": reqData["Twitter"],
                "Github": reqData["Github"],
                "LinkedIn": reqData["LinkedIn"],
                "Portfolio": reqData["Portfolio"],
                "Other": reqData["Other"],
            }
            social_serializer = SocialSerializer(
                socialData, data=newSocial)
            if social_serializer.is_valid():
                social_serializer.save()
                return JsonResponse({'success': True, 'msg': "Update Sucessfully"})
            return JsonResponse({'success': False, 'msg': "Failed"})
        return JsonResponse({'success': False, 'msg': "Social Not Found"})


@csrf_exempt
def followApi(request, userId=0):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        followData = Followed.objects.filter(Username_id=reqData["Username"])
        if followData:
            return JsonResponse({'success': False, 'msg': "Followed Already Exist"})
        follow_serializer = FollowedSerializer(data=reqData)
        if follow_serializer.is_valid():
            follow_serializer.save()
            return JsonResponse({'success': True, 'msg': "Followed Added Successfully"})
        return JsonResponse({'success': False, 'msg': "Failed"})
    elif request.method == "GET":
        followData = Followed.objects.filter(Username_id=userId)
        if followData:
            follow_serializer = FollowedSerializer(
                followData, many=True)
            return JsonResponse({'success': True, 'msg': follow_serializer.data})
        return JsonResponse({'success': False, 'msg': "Folowed Not Found"})
    elif request.method == "PUT":
        reqData = JSONParser().parse(request)
        Username = Followed.objects.filter(
            Id=userId)
        if not Username:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
        followData = Followed.objects.filter(
            Username_id=userId, Id=reqData["Id"])
        if followData:
            newFollow = {
                "Followed": reqData["Followed"],
            }
            follow_serializer = FollowedSerializer(
                followData, data=newFollow)
            if follow_serializer.is_valid():
                follow_serializer.save()
                return JsonResponse({'success': True, 'msg': "Update Sucessfully"})
            return JsonResponse({'success': False, 'msg': "Failed"})
        return JsonResponse({'success': False, 'msg': "Followed Not Found"})
