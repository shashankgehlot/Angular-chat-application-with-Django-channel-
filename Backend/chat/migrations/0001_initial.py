# Generated by Django 3.1.4 on 2020-12-11 14:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sent_to', models.CharField(max_length=50)),
                ('sender_name', models.IntegerField(default=0)),
                ('reciver_name', models.IntegerField(default=0)),
                ('Message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('sent_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]