from rest_framework import serializers

from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from user.models import Member
from pool.models import Pool

User = get_user_model()


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password', 'gender', 'foto', 'phone_number',
            'direccion', 'country', 'city', 'first_name', 'last_name'
        ]
        read_only_fields = ['id']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
    

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['product_quantity', 'joined_at']

    def create(self, validated_data):

        pool = validated_data.get('pool')

        """ if not pool.is_open():
            raise ValidationError({"error": "El pool está cerrado."}) """
        
        user = validated_data.get('user')

        if user.is_member_of(pool):
            raise ValidationError({"error": "El usuario ya es miembro de este pool."})

        pool.update_stock(validated_data.get('product_quantity'))
        
        validated_data["pool"] = pool
        
        member =  Member.objects.create(**validated_data)
        return member
    

class MemberPoolSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model = Member
        fields = ['user', 'product_quantity', 'joined_at']





        