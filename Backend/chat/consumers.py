import json
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import User
from .models import Message



import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        self.text_data_json = json.loads(text_data)
        sent_by=self.text_data_json['sender_name']
        self.text_data_json['room_name']=self.room_name
        self.text_data_json['senders']= User.objects.get(username=self.text_data_json['sender_name'])
        self.text_data_json['recivers_id'] = User.objects.get(username=self.text_data_json['reciver_name']).pk
        self.message = self.text_data_json['message']
        Message_obj=Message(**self.text_data_json)
        Message_obj.save()
        self.last_10_messages=self.get_messages()

         #this self.send send back  to user
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': self.message,
                'sent_by': sent_by,
                "last_10_messages":self.last_10_messages
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        sent_by= event['sent_by']
        last_10_messages=event['last_10_messages']
        self.send(text_data=json.dumps({
            'message': message,
            'senders_name':sent_by,
            'last_10_messages':last_10_messages
        }))

    def get_messages(self):
        from django.db.models import Q
        room_name=self.room_name
        messages= Message.objects.order_by('-created_at').all().filter(Q(room_name=room_name))[:10]
        return self.make_json(messages)

     
    def make_json(self,messages):
        list_messages=[]
        for message in messages:
            message_dict={}
            message_dict['message']=message.message
            message_dict['senders_name']=message.sender_name
            list_messages.append(message_dict)
        return list(list_messages)
    

            

    