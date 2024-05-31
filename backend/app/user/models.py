# User model
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

# Post save receiver
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    profile_pic = models.ImageField(blank=True)
    friends = models.ManyToManyField("self", symmetrical=True, blank=True)
    last_activity = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.username

    def update_last_activity(self):
        User.objects.filter(id=self.id).update(last_activity=timezone.now())
        return self


# Adds a token to each new created user
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
