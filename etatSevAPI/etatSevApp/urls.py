from django.urls import path
from etatSevApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    path('Personne',views.PersonneApi),
    path('Personne/<int:id>',views.PersonneApi),

    path('PersonneDeces',views.PersonneDecesApi),
    path('PersonneDeces/<int:id>',views.PersonneDecesApi),

    path('Famille',views.FamilleApi),
    path('Famille/<int:id>',views.FamilleApi),

    path('Registre',views.RegistreApi),
    path('Registre/<int:id>',views.RegistreApi),

    path('Officier',views.OfficierApi),
    path('Officier/<int:id>',views.OfficierApi),

    path('Travaille',views.TravailleApi),
    path('Travaille/<int:id>',views.TravailleApi),

    path('TravailleI',views.TravailleApiI),
    path('TravailleI/<int:id>',views.TravailleApiI),

    path('Consulat',views.ConsulatApi),
    path('Consulat/<int:id>',views.ConsulatApi),

    path('Bureau',views.BureauApi),
    path('Bureau/<int:id>',views.BureauApi),

    path('Commune',views.CommuneApi),

    path('Agent_Consulat',views.Agent_ConsulatApi),
    path('Agent_Consulat/<int:id>',views.Agent_ConsulatApi),

    path('engeristrement',views.engeristrementApi),
    path('engeristrement/<int:id>',views.engeristrementApi),

    path('Officier/savefile',views.SaveFile)
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)