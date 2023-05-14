from rest_framework import serializers
from .models import Personne,PersonneDeces,Famille,Registre,Officier,Travaille,Consulat,Bureau,Commune,Agent_Consulat,TravailleI,engeristrement

class PersonneSerializer(serializers.ModelSerializer):
    class Meta:
        model=Personne 
        fields="__all__"

class PersonneDecesSerializer(serializers.ModelSerializer):
    class Meta:
        model=PersonneDeces 
        fields="__all__"

class FamilleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Famille 
        fields="__all__"

class RegistreSerializer(serializers.ModelSerializer):
    class Meta:
        model=Registre 
        fields="__all__"

class OfficierSerializer(serializers.ModelSerializer):
    class Meta:
        model=Officier 
        fields="__all__"

class TravailleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Travaille 
        fields="__all__"

class ConsulatSerializer(serializers.ModelSerializer):
    class Meta:
        model=Consulat 
        fields="__all__"

class BureauSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bureau 
        fields="__all__"

class OfficierSerializer(serializers.ModelSerializer):
    class Meta:
        model=Officier 
        fields="__all__"

class Agent_ConsulateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Agent_Consulat 
        fields="__all__"

class CommuneSerializer(serializers.ModelSerializer):
    class Meta:
        model=Commune 
        fields="__all__"

class TravailleSerializerI(serializers.ModelSerializer):
    class Meta:
        model=TravailleI 
        fields="__all__"

class engeristrementSerializer(serializers.ModelSerializer):
    class Meta:
        model=engeristrement 
        fields="__all__"