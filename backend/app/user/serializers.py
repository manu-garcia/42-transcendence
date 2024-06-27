from rest_framework import serializers
from .models import User


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "profile_pic",
            "last_activity",
        )
        read_only_fields = (
            "username",
            "first_name",
            "last_name",
            "profile_pic",
            "last_activity",
        )
        # depth = 1


class UserSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True, required=False)
    profile_pic = serializers.ImageField(use_url=False)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "profile_pic",
            "friends",
            "last_activity",
        )
        read_only_fields = ("username",)

    def update(self, instance, validated_data):
        friends_data = self.initial_data.pop("friends", [])
        validated_data.pop("friends", [])

        # Update user instance fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if friends_data is not None:
            # Clear current friends
            instance.friends.clear()
            for friend_data in friends_data:
                if isinstance(friend_data, dict):
                    friend_id = friend_data.get("id")
                else:
                    friend_id = friend_data.id

                if friend_id:
                    try:
                        friend_instance = User.objects.get(id=friend_id)
                        instance.friends.add(friend_instance)
                    except User.DoesNotExist:
                        print(
                            f"UserSerializer.update: User with ID {friend_id} does not exist."
                        )
                else:
                    print("UserSerializer.update: Friend ID not found in friend_data")

        return instance
