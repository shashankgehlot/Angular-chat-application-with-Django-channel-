from django.shortcuts import render
from django.db.models import Q
from django.core import serializers
from .models import Message

def index(request):
    return render(request, 'chat/index.html', {})

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })

