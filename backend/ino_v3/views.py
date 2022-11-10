from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.files.storage import default_storage
from django.http import FileResponse

from ino_v3.models import Signup, Login
from ino_v3.serializers import SignupSerializer, LoginSerializer

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
