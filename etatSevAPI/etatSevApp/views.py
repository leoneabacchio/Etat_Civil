from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from .models import Personne,PersonneDeces,Famille,Registre,Officier,Travaille,Consulat,Bureau,Commune,Agent_Consulat,TravailleI,engeristrement
from .serializers import PersonneSerializer,PersonneDecesSerializer,FamilleSerializer,RegistreSerializer,OfficierSerializer,TravailleSerializer,ConsulatSerializer,BureauSerializer,CommuneSerializer,Agent_ConsulateSerializer,TravailleSerializerI,engeristrementSerializer

from django.core.files.storage import default_storage

@csrf_exempt
def PersonneApi(request,id=0):
    if request.method=='GET':
        Personnes = Personne.objects.all()
        Serializer=PersonneSerializer(Personnes,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=PersonneSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Personnes=Personne.objects.get(NumP=data['NumP'])
        serializer=PersonneSerializer(Personnes,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Personnes=Personne.objects.get(NumP=id)
        Personnes.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def PersonneDecesApi(request,id=0):
    if request.method=='GET':
        PersonneDece = PersonneDeces.objects.all()
        Serializer=PersonneDecesSerializer(PersonneDece,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=PersonneDecesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        PersonneDece=PersonneDeces.objects.get(NumD=data['NumD'])
        serializer=PersonneDecesSerializer(PersonneDece,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        PersonneDece=PersonneDeces.objects.get(NumD=id)
        PersonneDece.delete()
        return JsonResponse("Deleted Successfully",safe=False)


@csrf_exempt
def FamilleApi(request,id=0):
    if request.method=='GET':
        Familles = Famille.objects.all()
        Serializer=FamilleSerializer(Familles,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=FamilleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Familles=Famille.objects.get(NumF=data['NumF'])
        serializer=FamilleSerializer(Familles,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Familles=Famille.objects.get(NumF=id)
        Familles.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def RegistreApi(request,id=0):
    if request.method=='GET':
        Registres = Registre.objects.all()
        Serializer=RegistreSerializer(Registres,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=RegistreSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Registres=Registre.objects.get(id=data['id'])
        serializer=RegistreSerializer(Registres,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Registres=Registre.objects.get(id=id)
        Registres.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def engeristrementApi(request,id=0):
    if request.method=='GET':
        engeristrements = engeristrement.objects.all()
        Serializer=engeristrementSerializer(engeristrements,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=engeristrementSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        engeristrements=engeristrement.objects.get(NumE=data['NumE'])
        serializer=engeristrementSerializer(engeristrements,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        engeristrements=engeristrement.objects.get(NumE=id)
        engeristrements.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def OfficierApi(request,id=0):
    if request.method=='GET':
        Officiers = Officier.objects.all()
        Serializer=OfficierSerializer(Officiers,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=OfficierSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Officiers=Officier.objects.get(NumOff=data['NumOff'])
        serializer=OfficierSerializer(Officiers,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Officiers=Officier.objects.get(NumOff=id)
        Officiers.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def TravailleApi(request,id=0):
    if request.method=='GET':
        Travailles = Travaille.objects.all()
        Serializer=TravailleSerializer(Travailles,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=TravailleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Travailles=Travaille.objects.get(id=data['id'])
        serializer=TravailleSerializer(Travailles,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Travailles=Travaille.objects.get(id=id)
        Travailles.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def TravailleApiI(request,id=0):
    if request.method=='GET':
        Travailles = TravailleI.objects.all()
        Serializer=TravailleSerializerI(Travailles,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=TravailleSerializerI(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Travailles=TravailleI.objects.get(id=data['id'])
        serializer=TravailleSerializerI(Travailles,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    elif request.method=='DELETE':
        Travailles=Travaille.objects.get(id=id)
        Travailles.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def ConsulatApi(request,id=0):
    if request.method=='GET':
        Consulats = Consulat.objects.all()
        Serializer=ConsulatSerializer(Consulats,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=ConsulatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Consulats=Consulat.objects.get(NumB=data['NumB'])
        serializer=ConsulatSerializer(Consulats,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Consulats=Consulat.objects.get(NumB=id)
        Consulats.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def BureauApi(request,id=0):
    if request.method=='GET':
        Bureaus = Bureau.objects.all()
        Serializer=BureauSerializer(Bureaus,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=BureauSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Bureaus=Bureau.objects.get(NumB=data['NumB'])
        serializer=BureauSerializer(Bureaus,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Bureaus=Bureau.objects.get(NumB=id)
        Bureaus.delete()
        return JsonResponse("Deleted Successfully",safe=False)

def CommuneApi(request):
    if request.method=='GET':
        Communes = Commune.objects.all()
        Serializer=CommuneSerializer(Communes,many=True)
        return JsonResponse(Serializer.data,safe=False)

@csrf_exempt
def Agent_ConsulatApi(request,id=0):
    if request.method=='GET':
        Agent_Consulats = Agent_Consulat.objects.all()
        Serializer=Agent_ConsulateSerializer(Agent_Consulats,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=Agent_ConsulateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Agent_Consulats=Agent_Consulat.objects.get(NumAgent=data['NumAgent'])
        serializer=Agent_ConsulateSerializer(Agent_Consulats,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Agent_Consulats=Agent_Consulat.objects.get(NumAgent=id)
        Agent_Consulats.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)

