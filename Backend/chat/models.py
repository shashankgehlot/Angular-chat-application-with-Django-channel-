from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class Message(models.Model):
    senders = models.ForeignKey(User, on_delete=models.CASCADE) # new
    recivers_id = models.IntegerField()
    sender_name=models.CharField(max_length=20)
    reciver_name=models.CharField(max_length=20)
    message = models.TextField()
    room_name = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return ' message {} {}'.format(self.sender_name, self.reciver_name)

    # def last_10_msg(self):
    #     return Message.objects.order_by('-created_at').all()[:10]

