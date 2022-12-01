from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.files.storage import default_storage
from django.http import FileResponse
import json

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
                Login_serializer = LoginSerializer(UserData[0])
                return JsonResponse({'success': True, 'msg': Login_serializer.data["Username"]})
            return JsonResponse({'success': False, 'msg': "Incorrect Password"})
        else:
            return JsonResponse({'success': False, 'msg': "User not Exist"})
    return JsonResponse({'success': False, 'msg': "User not Exist"})


@csrf_exempt
def userApi(request, username="", id=0):
    if request.method == "GET":
        if (username):
            UserData = Signup.objects.filter(
                Username=username)
        elif (id):
            UserData = Signup.objects.filter(
                Id=id)
        if UserData:
            Login_serializer = LoginSerializer(UserData[0])
            return JsonResponse({'success': True, 'msg': Login_serializer.data})
        return JsonResponse({'success': False, 'msg': "User not Exist"})


@csrf_exempt
def updateApi(request, userId=0):
    reqData = JSONParser().parse(request)
    if request.method == "PUT":
        UserData = Signup.objects.get(
            Id=userId)
        if UserData:
            user_serializer = SignupSerializer(
                UserData, data=reqData)
            if user_serializer.is_valid():
                user_serializer.save()
                return JsonResponse({'success': True, 'msg': "Update Sucessfully"})
            return JsonResponse({'success': False, 'msg': "Failed"})
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
        username = Signup.objects.filter(Id=reqData["Username"])
        if not username:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
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
            Username_id=userId, Id=reqData["Id"]).first()
        if socialData:
            social_serializer = SocialSerializer(
                socialData, data=reqData)
            if social_serializer.is_valid():
                social_serializer.save()
                return JsonResponse({'success': True, 'msg': "Update Sucessfully"})
            return JsonResponse({'success': False, 'msg': "Failed"})
        return JsonResponse({'success': False, 'msg': "Social Not Found"})


@csrf_exempt
def checkFollowApi(request, userId=0, id=0):
    if request.method == "GET":
        username = Signup.objects.filter(Id=userId)
        if not username:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
        followData = Followed.objects.filter(Username_id=userId).first()
        if followData:
            follow_serializer = FollowedSerializer(
                followData)
            follow = json.loads(follow_serializer.data["Followed"])
            for i in follow:
                if i['id'] == id:
                    return JsonResponse({'success': True, 'msg': "Following"})
            return JsonResponse({'success': False, 'msg': "Not Following"})
        return JsonResponse({'success': False, 'msg': "Folowed Not Found"})


@csrf_exempt
def followApi(request, userId=0):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        followData = Followed.objects.filter(Username_id=reqData["Username"])
        username = Signup.objects.filter(Id=reqData["Username"])
        if not username:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
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
            Username_id=userId, Id=reqData["Id"]).first()
        if followData:
            follow_serializer = FollowedSerializer(
                followData, data=reqData)
            if follow_serializer.is_valid():
                follow_serializer.save()
                return JsonResponse({'success': True, 'msg': "Update Sucessfully"})
            return JsonResponse({'success': False, 'msg': "Failed"})
        return JsonResponse({'success': False, 'msg': "Followed Not Found"})


@csrf_exempt
def projectApi(request, userId=0, id=0):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        username = Signup.objects.filter(Id=reqData["Username"])
        if not username:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
        project_serializer = ProjectSerializer(data=reqData)
        if project_serializer.is_valid():
            project_serializer.save()
            return JsonResponse({'success': True, 'msg': "Project Added Successfully"})
        return JsonResponse({'success': False, 'msg': "Failed"})
    elif request.method == "GET":
        projeData = Project.objects.filter(Username_id=userId)
        if projeData:
            project_serializer = ProjectSerializer(projeData, many=True)
            return JsonResponse({'success': True, 'msg': project_serializer.data})
        return JsonResponse({'success': False, 'msg': "No Project Found"})
    elif request.method == "DELETE":
        username = Signup.objects.filter(Id=userId)
        if not username:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
        username = Signup.objects.filter(Id=userId)
        if not username:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
        projectData = Project.objects.filter(Id=id)
        if not projectData:
            return JsonResponse({'success': False, 'msg': "Project Not Found"})
        projectData = Project.objects.filter(Username_id=userId, Id=id)
        if not projectData:
            return JsonResponse({'success': False, 'msg': "Project Not Belong to the User"})
        projeData = Project.objects.filter(Id=id)
        projeData.delete()
        return JsonResponse({'success': True, 'msg': "Deleted Sucessfully"})


@csrf_exempt
def searchByUsernameApi(request, username=''):
    if request.method == "GET":
        allUser = Signup.objects.filter(Username__contains=username)
        user_serializer = LoginSerializer(allUser, many=True)
        userData = user_serializer.data
        return JsonResponse({'success': True, 'msg': userData})


@csrf_exempt
def searchByNameApi(request, name=''):
    if request.method == "GET":
        allUser = Signup.objects.filter(Name__contains=name)
        user_serializer = LoginSerializer(allUser, many=True)
        userData = user_serializer.data
        return JsonResponse({'success': True, 'msg': userData})

# def settings(request, pk):
#     # query for the UserSettings object
#     instance = get_object_or_404(UserSettings.objects.all(), pk=pk)

#     if request.method == 'PUT':
#         request.data['user'] = user.id

#         # pass in the instance we want to update
#         serializer = UserSettingsSerializer(instance, data=request.data)

#         # validate and update
#         if serializer.is_valid():
#             serializer.save()
#             serializer_dict = serializer.data
#             serializer_dict["message"] = "Settings updated successfully."
#             return Response(serializer_dict, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors,
#                             status=status.HTTP_400_BAD_REQUEST)
