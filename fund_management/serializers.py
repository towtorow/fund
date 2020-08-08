from .models import FundUser
from .models import Fund
from rest_framework import serializers

class FundUserSerializer(serializers.ModelSerializer) :
    class Meta:
        model = FundUser
        fields = '__all__'

class FundSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Fund
        fields = '__all__'
