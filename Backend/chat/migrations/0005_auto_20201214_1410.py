# Generated by Django 3.1.4 on 2020-12-14 14:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_auto_20201214_1406'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='senders_id',
            new_name='senders',
        ),
    ]
