from django.db import models
from user.models import User

class EventGroup(models.Model):
    id = models.AutoField(primary_key=True)
    event = models.ForeignKey('Event', on_delete=models.CASCADE, default=1)
    max_users = models.IntegerField()

    class Meta:
        db_table = "event_group"
    def __str__(self):
        return f"EventGroup {self.id} - Event: {self.event_id} - Max Users: {self.max_users}"

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, unique=True)
    played = models.BooleanField(default=False)
    type = models.IntegerField()
    winner_event_group = models.ForeignKey(EventGroup, on_delete=models.CASCADE, default=1, related_name='winner_event_group')

    class Meta:
        db_table = "event"
    def __str__(self):
        return f"Event {self.id} - Name: {self.name} - Played: {self.played} - Type: {self.type}"

class EventMatch(models.Model):
    id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, default=1)
    event_group_1 = models.ForeignKey(EventGroup, on_delete=models.CASCADE, default=1, related_name='event_group_1')
    event_group_2 = models.ForeignKey(EventGroup, on_delete=models.CASCADE, default=1, related_name='event_group_2')
    played = models.BooleanField(default=False)
    points_delta = models.IntegerField()
    winner_event_match_group = models.ForeignKey(EventGroup, on_delete=models.CASCADE, default=1, related_name='winner_event_match_group')

    class Meta:
        db_table = "event_match"
    def __str__(self):
        return f"EventMatch {self.id} - Event: {self.event_id} - Group 1: {self.event_group_1_id} - Group 2: {self.event_group_2_id} - Played: {self.played} - Points Delta: {self.points_delta}"

class EventGroupUser(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    event_group = models.ForeignKey(EventGroup, on_delete=models.CASCADE, default=1)
    alias = models.CharField(max_length=100)

    class Meta:
        db_table = "event_group_user"
    def __str__(self):
        return f"EventGroupUser {self.id} - User: {self.user_id} - Event Group: {self.event_group_id} - Alias: {self.alias}"
