from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer
import json
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.contrib.sessions.models import Session
from django.utils import timezone
from django.core import serializers

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self,request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response({
            "userinfo":UserSerializer(user, context=self.get_serializer_context()).data,
            "status":201,
            "message":"User Created"
        })

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username':user.username,
            'fistname':user.first_name,
            'lastname':user.last_name,
            'email': user.email,
            "status":status.HTTP_201_CREATED
        })



class Logout(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response({'message':"User Loggged out",'status':status.HTTP_200_OK})


# from rest_framework.permissions import IsAuthenticated


class ExampleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        active_sessions = Token.objects.all()
        x=serializers.serialize("json",active_sessions)
        p=json.loads(x)
        self.following_users=[]
        for i in range(len(p)):
            user = User.objects.get(id=p[i]['fields']['user'])
            self.following_users.append(user.id)
        self.user_list=[]
        self.user = User.objects.get(username=self.sample_view(request)).id
        self.following_users.remove(self.user)
        for user in User.objects.filter(id__in=self.following_users):
            self.user_dict = {}
            self.user_dict['username'] = user.username
            self.user_dict['firstname'] = user.first_name
            self.user_dict['lastname'] = user.last_name
            self.user_dict['email'] = user.email
            self.user_list.append(self.user_dict)
        self.user_list=list(self.user_list)
        return JsonResponse(self.user_list, status=201,safe=False)

    def sample_view(self,request):
        self.current_user = request.user
        return self.current_user


