# Generated by Django 3.1.4 on 2020-12-14 12:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_auto_20201214_1234'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='sent_to',
            new_name='recivers_id',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='sent_by',
            new_name='senders_id',
        ),
    ]
