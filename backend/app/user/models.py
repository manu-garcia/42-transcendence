# User model
from django.contrib.auth.models import AbstractUser
from django.db import models

# Post save receiver
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token


def get_user_avatar_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/avatar/user_<id>_<filename>
    return "avatar/user_{0}_{1}".format(instance.id, filename)


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    profile_pic = models.ImageField(blank=True, upload_to=get_user_avatar_path)

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.username


# Adds a token to each new created user
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:

        Token.objects.create(user=instance)
