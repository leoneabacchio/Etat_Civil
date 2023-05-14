from django.db import models

# Create your models here.
class Personne (models.Model):
   
   NumP = models.AutoField(primary_key=True)
   Numero_Naissance = models.CharField(max_length=10,null=True)
   Nom = models.CharField(max_length=50)
   Prenom = models.CharField(max_length=50)
   Sexe = models.CharField(max_length=15)
   Date_Naissance = models.DateField()
   Heure_Naissance = models.TimeField()
   Lieu_de_Naissance = models.CharField(max_length=20)
   Pays_de_Naissance = models.CharField(max_length=20,default='')
   Situation_Marital = models.BooleanField(default=True)
   Adress = models.CharField(max_length=30)
   Etat_de_vie = models.BooleanField(default=True)
   Profession = models.CharField(max_length=50,null=True)
   NumCommune = models.ForeignKey("Commune",on_delete=models.CASCADE,default='1')
   NumMere = models.ForeignKey("Personne",on_delete=models.SET_NULL,null=True,related_name='Mere')
   NumPere = models.ForeignKey("Personne",on_delete=models.SET_NULL,null=True,related_name='Pere')
   NumTet = models.ForeignKey("Personne",on_delete=models.SET_NULL,null=True,related_name='Tet')

class PersonneDeces (models.Model):
   
   NumD = models.AutoField(primary_key=True)
   NumP = models.ForeignKey("Personne",on_delete=models.SET_NULL,null=True)
   NumDeclarant = models.ForeignKey("Personne",on_delete=models.SET_NULL,null=True,related_name='Dec')
   Date_Deces = models.DateField()
   Heure_Deces = models.TimeField()
   Cause_Deces = models.CharField(max_length=50)
   Lieu_de_Deces = models.CharField(max_length=20)

class Famille (models.Model):

   NumF = models.AutoField(primary_key=True)
   NumHomme = models.ForeignKey("Personne",on_delete=models.SET_NULL,null=True,related_name='Homme')
   NumFamme = models.ForeignKey("Personne",on_delete=models.SET_NULL,null=True,related_name='Famme')
   Date_Mariage = models.DateField()
   lieu_Mariage = models.CharField(max_length=50)
   NumTem1= models.ForeignKey("Personne",on_delete=models.SET_NULL,null=True,related_name='Tem1')
   NumTem2= models.ForeignKey("Personne",on_delete=models.SET_NULL,null=True,related_name='Tem2')

class Officier (models.Model):

   NumOff = models.AutoField(primary_key=True)
   Matricule = models.CharField(max_length=10,null=True)
   Nom = models.CharField(max_length=50)
   Prenom = models.CharField(max_length=50)
   Nummaire =models.ForeignKey("Officier",on_delete=models.SET_NULL,null=True)
   Password = models.CharField(max_length=50,null=True)
   photo = models.CharField(max_length=50,null=True)

class Travaille (models.Model):
   NumOff=models.ForeignKey("Officier",on_delete=models.CASCADE)
   NumB=models.ForeignKey("Bureau",on_delete=models.CASCADE)
   Date_dub = models.DateField()
   Date_Fin = models.DateField(null=True)

class Consulat (models.Model):

   NumB = models.AutoField(primary_key=True)
   Nom_Paye = models.CharField(max_length=50)
    
class Bureau (models.Model):

   NumB = models.AutoField(primary_key=True)
   NumC = models.ForeignKey("Commune",on_delete=models.SET_NULL,null=True)

class Commune (models.Model):

   NumMaire=models.ForeignKey("Officier",on_delete=models.SET_NULL,null=True)
   Commune = models.CharField(max_length=50)
   Daira = models.CharField(max_length=50)
   Wilaya = models.CharField(max_length=50)

class Agent_Consulat (models.Model):

   NumAgent = models.AutoField(primary_key=True)
   Matricule = models.CharField(max_length=10,null=True)
   Nom = models.CharField(max_length=50)
   Prenom = models.CharField(max_length=50)
   NumSupAgent =models.ForeignKey("Agent_Consulat",on_delete=models.SET_NULL,null=True)
   Password = models.CharField(max_length=50,null=True)
   photo = models.CharField(max_length=50,null=True)

class TravailleI (models.Model):
   NumAgent=models.ForeignKey("Agent_Consulat",on_delete=models.CASCADE)
   NumB=models.ForeignKey("Consulat",on_delete=models.CASCADE)
   Date_dub = models.DateField()
   Date_Fin = models.DateField(null=True)

class Registre(models.Model):
   
   NumRegistre = models.AutoField(primary_key=True)
   Annee = models.CharField(max_length=10, default='')
   Type = models.CharField(max_length=10)
   NumBureau=models.ForeignKey("Commune",on_delete=models.CASCADE)

class engeristrement(models.Model):

   NumE = models.AutoField(primary_key=True)
   cle = models.IntegerField()
   Date_E = models.DateField()
   Heure_E = models.TimeField()
   NumRegistre = models.ForeignKey("Registre",on_delete=models.CASCADE)
   NumOff = models.ForeignKey("Officier",on_delete=models.CASCADE)
