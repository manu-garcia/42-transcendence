from rest_framework import serializers
from .models import Event, EventGroup, EventGroupUser, EventType, User


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "played",
            "type",
            "winner_event_group",
        ]

    def to_internal_value(self, data):
        name = data.get("name")
        type = data.get("type")

        if not name:
            raise serializers.ValidationError({"name": "This field is required."})
        if not type:
            raise serializers.ValidationError({"type": "This field is required."})

        return {"name": name, "type": type}

    def create(self, validated_data):

        # Create event group user
        def create_event_group_user(event_group, event_group_user_data):
            user_data = event_group_user_data.pop("user", None)
            user_instance = User.objects.get(id=user_data["id"])
            event_group_user_data["user"] = user_instance
            event_group_user_data["event_group"] = event_group
            EventGroupUser.objects.create(**event_group_user_data)

        max_users = self.initial_data.pop("max_users", None)
        event_group_user_1_data = self.initial_data.pop("users_1", [])
        event_group_user_2_data = self.initial_data.pop("users_2", [])

        validated_data.pop("users_1", [])
        validated_data.pop("users_2", [])

        # Create event
        event = Event.objects.create(**validated_data)

        # Create event group
        event_group_data = {}
        event_group_data["event"] = event
        event_group_data["max_users"] = max_users

        if validated_data["type"] == EventType.QUICK_GAME:
            event_group_1 = EventGroup.objects.create(**event_group_data)
            event_group_2 = EventGroup.objects.create(**event_group_data)
            for event_group_user_data in event_group_user_1_data:
                create_event_group_user(event_group_1, event_group_user_data)
            for event_group_user_data in event_group_user_2_data:
                create_event_group_user(event_group_2, event_group_user_data)

        elif validated_data["type"] == EventType.TOURNAMENT:
            for event_group_user_data in event_group_user_1_data:
                event_group = EventGroup.objects.create(**event_group_data)
                create_event_group_user(event_group, event_group_user_data)

        return event
