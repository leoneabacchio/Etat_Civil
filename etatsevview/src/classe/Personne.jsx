import React,{Component} from 'react';
import {variables} from '../Variables.js';

export class Personne extends Component{

    constructor(props){
        super(props);

        this.state={
            Personne:[],
            AllPersonne:[],
            famille:[],
            Death:[],
            Commune:[],
            engeristrement:[],
            offcier:[],

            modalTitle:"",
            OffecierLog:[],
            /////////////info of personne
            P:[],
            Mere:[],
            Pere:[],
            Numero_NaissancePere:"",
            Numero_NaissanceMere:"",
            Tete:[],
            Numero_NaissanceTete:"",
            Numero_NaissanceDeclarent:"",
            GF1:[],
            GM1:[],
            GF2:[],
            GM2:[],
            Pdeath:[],
            Declarent:[],
            PFamille:[],
            PPartner:[0,0,0,0],
            Numero_NaissancePartner:[0,0,0,0],
            PCommune:null,
            live:"",
            ///////////////////Actes
            F:{},
            PP:{},
            Annee:"",
            DDate:"",
            PPere:{},
            PMere:{},
            Communeoff:{},
            eng:null,
            offeng:null,
            /////////////////////////////////
            PersonnePrenomFilter:"",
            PersonneNomFilter:"",
            PersonneYearFilter:"",
            PersonneYearMariageFilter:"",
            PersonneYearDeathFilter:"",
            PersonneWithoutFilter:[],

            offMat:0,
            Personnetbl:'Personne',
            Officiertbl:'Officier',
            Familletbl:'Famille',
            deathtbl:'PersonneDeces',
            Communetbl:'Commune',
            enregistrementtbl:'engeristrement'
        }
    }
////////////////////////////filter
    FilterFn(){
        var PersonnePrenomFilter=this.state.PersonnePrenomFilter;
        var PersonneNomFilter = this.state.PersonneNomFilter;
        var PersonneYearFilter = this.state.PersonneYearFilter;
        var PersonneYearDeathFilter = this.state.PersonneYearDeathFilter;
        var PersonneYearMariageFilter = this.state.PersonneYearMariageFilter;
        var Death = this.state.Death;
        var Famille = this.state.famille;

        var filteredData=this.state.PersonneWithoutFilter.filter(
            function(el){
                return el.Prenom.toString().toLowerCase().includes(
                    PersonnePrenomFilter.toString().trim().toLowerCase()
                )&&
                el.Nom.toString().toLowerCase().includes(
                    PersonneNomFilter.toString().trim().toLowerCase()
                )&&
                el.Date_Naissance.toString().toLowerCase().includes(
                    PersonneYearFilter.toString().trim().toLowerCase()
                )
            }
        );
        if(PersonneYearMariageFilter!=="")
        filteredData=filteredData.filter(function(el){
            let NumP=el.NumP;
            let Sexe=el.Sexe;
            let F=Famille;
            if(el.Situation_Marital){F=Famille.filter(function(el){
                if(Sexe=="Homme")if(el.NumHomme===NumP)return el;
                if(Sexe=="Famme")if(el.NumFamme===NumP)return el;
            });}else F=[];
                for(let i=0;i<F.length;i++){
                console.log(Famille[i])
                if(F[i].Date_Mariage.toString().toLowerCase().includes(
                    PersonneYearMariageFilter.toString().trim().toLowerCase()
                ))return el;
            }    
                });
        this.setState({Personne:filteredData});
        if(PersonneYearDeathFilter!=="")
        filteredData=filteredData.filter(function(el){
            let D=Death;
            let NumP=el.NumP;
                if(!el.Etat_de_vie){D= Death.filter(function(el){
                    if(el.NumP===NumP)return el;
                });
                if(D[0].Date_Deces.toString().toLowerCase().includes(
                    PersonneYearDeathFilter.toString().trim().toLowerCase()
                ))return el;    
                }
            });
        this.setState({Personne:filteredData});
        if(this.state.live!=="")
        filteredData=filteredData.filter(function(el){
                if(el.Etat_de_vie)return el;
            });
        this.setState({Personne:filteredData});
    }
    refrech=()=>{
        this.state.live="";
        this.state.PersonneYearDeathFilter="";
        this.state.PersonneYearMariageFilter="";
        this.FilterFn();
    }
    sortResult(prop,asc){
        var sortedData=this.state.PersonneWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({Personne:sortedData});
    }

    changePersonnePrenomFilter = (e)=>{
        this.state.PersonnePrenomFilter=e.target.value;
        this.FilterFn();
    }
    changePersonneNomFilter = (e)=>{
        this.state.PersonneNomFilter=e.target.value;
        this.FilterFn();
    }
    changePersonneyearFilter = (e)=>{
        this.state.PersonneYearFilter=e.target.value;
        this.FilterFn();
    }
    changePersonneYearMariageFilter = (e)=>{
        this.state.PersonneYearMariageFilter=e.target.value;
        this.FilterFn();
    }
    changePersonneYearDeathFilter = (e)=>{
        this.state.PersonneYearDeathFilter=e.target.value;
        this.FilterFn();
    }
    changelive=(e)=>{
        this.state.live=e.target.value;
        this.FilterFn();
    }
//////////////////////////get data from API
    refreshList(){
        let C= this.props.Communeoff;
        fetch(variables.API_URL+this.state.Personnetbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({AllPersonne:data})
            if(C>0){
            data=data.filter(function(el){
                if(el.NumCommune===C) return el;
            })}
            this.setState({Personne:data,PersonneWithoutFilter:data,})
        });
        fetch(variables.API_URL+this.state.Familletbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({famille:data});
        });
        fetch(variables.API_URL+this.state.enregistrementtbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({engeristrement:data});
        });
        fetch(variables.API_URL+this.state.Officiertbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({offcier:data});
        });
        fetch(variables.API_URL+this.state.deathtbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Death:data});
        });
        fetch(variables.API_URL+this.state.Communetbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Commune:data});
        })
    }
    componentDidMount(){
        this.refreshList();
        this.state.OffecierLog=this.props.offlog[0];
    }
//////////////////////set state var
    changeNumero_Naissance=(e)=>{
        let X=this.state.P;
        X.Numero_Naissance=e.target.value;
        this.setState({P:X});
    }
    changePersonneNom =(e)=>{
        let X=this.state.P;
        X.Nom=e.target.value;
        this.setState({P:X});
    }
    changePersonnePreNom=(e)=>{
        let X=this.state.P;
        X.Prenom=e.target.value;
        this.setState({P:X});
    }
    changeSexe=(e)=>{
        let X=this.state.P;
        X.Sexe=e.target.value;
        this.setState({P:X});
    }
    changeDate_Naissance=(e)=>{
        let X=this.state.P;
        X.Date_Naissance=e.target.value;
        this.setState({P:X});
    }
    changeH_Naissance=(e)=>{
        let X=this.state.P;
        X.Heure_Naissance=e.target.value;
        this.setState({P:X});
    }
    changeLieu_de_Naissance=(e)=>{
        let X=this.state.P;
        X.Lieu_de_Naissance=e.target.value;
        this.setState({P:X});
    }
    changePays_de_Naissance=(e)=>{
        let X=this.state.P;
        X.Pays_de_Naissance=e.target.value;
        this.setState({P:X});
    }
    changeAdress=(e)=>{
        let X=this.state.P;
        X.Adress=e.target.value;
        this.setState({P:X});
    }
    changeCommune=(e)=>{
        let X=this.state.P;
        X.Commune=e.target.value;
        this.setState({P:X});
    }
    changeProfession=(e)=>{
        let X=this.state.P;
        X.Profession=e.target.value;
        this.setState({P:X});
    }
    changeNumeroNaiPere=(e)=>{
        this.setState({Numero_NaissancePere:e.target.value});
        this.changeGrandParentsPere(e.target.value);
    }
    changeNumeroNaiMere=(e)=>{
        this.setState({Numero_NaissanceMere:e.target.value});
        this.changeGrandParentsMere(e.target.value);
    }
    changeNumeroNaiTete=(e)=>{
        this.setState({Numero_NaissanceTete:e.target.value});
        this.state.Tete=this.getPersonneNumNai(e.target.value);
    }
    changeNumeroNaiDeclarent=(e)=>{
        this.setState({Numero_NaissanceDeclarent:e.target.value});
        this.state.Declarent=this.getPersonneNumNai(e.target.value);
    }
    changeNumeroNaiPartner=(e)=>{
        let i=e.target.getAttribute('a-key');
        let PP=this.state.Numero_NaissancePartner;
        PP[i]=e.target.value;
        this.setState({Numero_NaissancePartner:PP});
        this.state.PPartner[i][0]=this.getPersonneNumNai(e.target.value);
    }
    changeGrandParentsPere(Num){
        this.state.Pere=this.getPersonneNumNai(Num);
        this.setState({
            GF1:this.getGPere(this.state.Pere.NumP),
            GM1:this.getGMere(this.state.Pere.NumP),
        });
    }
    changeGrandParentsMere(Num){
        this.state.Mere=this.getPersonneNumNai(Num);
        this.setState({
            GF2:this.getGPere(this.state.Mere.NumP),
            GM2:this.getGMere(this.state.Mere.NumP),
        });
    }
    changeDateMariage=(e)=>{
        let i=e.target.getAttribute('a-key');
        let PF=this.state.PFamille;
        PF[i].Date_Mariage=e.target.value;
        this.setState({PFamille:PF});
    }
    changeLieuMariage=(e)=>{
        let i=e.target.getAttribute('a-key');
        let PF=this.state.PFamille;
        PF[i].lieu_Mariage=e.target.value;
        this.setState({PFamille:PF});
    }
    changeNamePertner=(e)=>{
        let i=e.target.getAttribute('a-key');
        let PP=this.state.PPartner;
        PP[i].Nom=e.target.value;
        this.setState({PPartner:PP});
    }
    changePrenomPertner=(e)=>{
        let i=e.target.getAttribute('a-key');
        let PP=this.state.PPartner;
        PP[i].Prenom=e.target.value;
        this.setState({PPartner:PP});
    }
    changeDateDecee=(e)=>{
        let X=this.state.Pdeath;
        X.Date_Deces=e.target.value;
        this.setState({Pdeath:X});
    }
    changeLieueDecee=(e)=>{
        let X=this.state.Pdeath;
        X.Lieu_de_Deces=e.target.value;
        this.setState({Pdeath:X});
    }
    changeHDecee=(e)=>{
        let X=this.state.Pdeath;
        X.Heure_Deces=e.target.value;
        this.setState({Pdeath:X});
    }
    changeCauseDecee=(e)=>{
        let X=this.state.Pdeath;
        X.Cause_Deces=e.target.value;
        this.setState({Pdeath:X});
    }
    changeDeclarantNameDecee=(e)=>{
        let X=this.state.Pdeath;
        X.Nom=e.target.value;
        this.setState({Declarent:X});
    }
    changeDeclarantPrenomDecee=(e)=>{
        let X=this.state.Pdeath;
        X.Prenom=e.target.value;
        this.setState({Declarent:X});
    }
    setActe(){
        let currentdate=new Date()
        let month=currentdate.getMonth()+1;
        if(month<10)month="0"+month;
        let day=currentdate.getDate();
        if(day<10)day="0"+day;
        
        let C=this.props.Communeoff;
        if(C>0)this.state.Communeoff=this.getCommune(C);
        else{
            C=1;
            this.state.Communeoff=this.getCommune(C);
        };
        console.log(this.props.Communeoff)
        this.setState({
            DDate: ""+ currentdate.getFullYear()+"-"+ month  + "-" + day,
        })
    }
    setActeMariage(F,PP){
        this.state.eng=this.getEng(F.NumF,2)

        let D=F.Date_Mariage.split("-");
        this.setActe();
        this.setState({
            F:F,
            PP:PP,
            PMere:this.getPersonne(PP.NumMere),
            PPere:this.getPersonne(PP.NumPere),
            Annee:D[0],
        });
    }
    setActeNaissance(){
        this.state.eng=this.getEng(this.state.P.NumP,1)

        let D=this.state.P.Date_Naissance.split("-");
        this.setActe();
        this.setState({
            Annee:D[0],
        });
    }
    setActeDecee(){
        this.state.eng=this.getEng(this.state.Pdeath.NumD,3)

        let D=this.state.Pdeath.Date_Deces.split("-");
        this.setActe();
        this.setState({
            Annee:D[0],
        });
    }
////////////////////////get Personne info
getPersonne(NumP){
    let P= this.state.AllPersonne.filter(function(el){
        if(el.NumP==NumP)return el;
    });
    return P[0];
}
getGPere(NumParet){
    let Parent= this.getPersonne(NumParet);
    return this.getPersonne(Parent.NumPere);
}
getGMere(NumParet){
    let Parent= this.getPersonne(NumParet);
    return this.getPersonne(Parent.NumMere);
}
getDeathP(P){
    if(!P.Etat_de_vie){let Pdeath= this.state.Death.filter(function(el){
        if(el.NumP===P.NumP)return el;
    });
    this.state.Pdeath= Pdeath[0];
    let Declarent= this.getPersonne(Pdeath[0].NumDeclarant);
    this.state.Declarent=Declarent;
    this.state.Numero_NaissanceDeclarent=Declarent.Numero_Naissance;
    }
    else this.state.Pdeath= null;
}
getPersonneNOMPRENOM(Nom,Prenom){
    let X= this.state.Personne.filter(function(el){
        if(el.Nom==Nom&&el.Prenom==Prenom)return el;
    });
    console.log(X)
    if(X.length==1)return X[0];
    else return null;
}
getPersonneNumNai(Num){
    let X= this.state.Personne.filter(function(el){
        if(el.Numero_Naissance==Num)return el;
    });
    if(X.length==1)return X[0];
    else return null;
}
getFamille(P){
    if(P.Situation_Marital){this.state.PFamille=this.state.famille.filter(function(el){
        if(P.Sexe=="Homme"){if(el.NumHomme==P.NumP)return el;
        }else if(el.NumFamme==P.NumP)return el;
    });
}
    else return null;
}
getPartnre(Sexe){
    if(this.state.PFamille!=null){
       let PFamille=this.state.PFamille;
       let Numero_NaiPar=this.state.Numero_NaissancePartner;
    for(let i=0;i<this.state.PFamille.length;i++){
    this.state.PPartner[i]= this.state.AllPersonne.filter(function(el){
        if(Sexe=="Homme"){if(el.NumP==PFamille[i].NumFamme){
            Numero_NaiPar[i]=el.Numero_Naissance;
            return el;
        }
        }else if(el.NumP==PFamille[i].NumHomme){
            Numero_NaiPar[i]=el.Numero_Naissance;
            return el;
        }
    })
}
this.state.Numero_NaissancePartner=Numero_NaiPar;
}
}
getCommune(NumC){
    let c= this.state.Commune.filter(function(el){
        if(el.id==NumC)return el;
    });
    return c[0];
}
getEng(cle,reg){
    console.log(cle,reg)
    let c= this.state.engeristrement.filter(function(el){
        if(el.cle===cle&&el.NumRegistre===reg)return el;
    });
    console.log(c)
    if(c.length===1){this.state.offeng=this.getOff(c[0].NumOff);
    return c[0];
    }else return null;
}
getOff(Numoff){
    let c= this.state.offcier.filter(function(el){
        if(el.NumOff===Numoff)return el;
    });
    console.log(c)
    return c[0]; 
}
maxNumP(){
    let max=0;
    this.refreshList();
    this.state.Personne.map(el=>{
        if(max<el.NumP)max=el.NumP;
    })
    return max;
}
///////////////////////pompe data actions
editClick(P){
    this.setState({P:this.getPersonne(P.NumP),
        Mere:this.getPersonne(P.NumMere),
        Pere:this.getPersonne(P.NumPere),
        Tete:this.getPersonne(P.NumTet),
    });    
    this.state.PCommune=this.getCommune(P.NumCommune);
        
    this.setState({
        GF1:this.getGPere(P.NumPere),
        GM1:this.getGMere(P.NumPere),
        GF2:this.getGPere(P.NumMere),
        GM2:this.getGMere(P.NumMere),
    });
        this.setNumNai(P);
        this.getFamille(P);
        this.getPartnre(P.Sexe);
        this.getDeathP(P);
        console.log(this.state.PFamille)
    }
    setNumNai(P){
       let Mere=this.getPersonne(P.NumMere);
       let Pere=this.getPersonne(P.NumPere);
       let Tete=this.getPersonne(P.NumTet);
        this.setState({
            Numero_NaissancePere:Pere.Numero_Naissance,
            Numero_NaissanceMere:Mere.Numero_Naissance,
            Numero_NaissanceTete:Tete.Numero_Naissance
        })
    }
    setFamille(){
        for(let i=0;i<this.state.PFamille.length;i++){
            if(this.state.P.Sexe==="Homme")this.state.PFamille[i].NumFamme=this.state.PPartner[i][0].NumP;
            if(this.state.P.Sexe==="Famme")this.state.PFamille[i].NumHomme=this.state.PPartner[i][0].NumP;
        }
    }
    setPersonne(){
        let Pere=this.getPersonneNumNai (this.state.Numero_NaissancePere)
        let Mere=this.getPersonneNumNai (this.state.Numero_NaissanceMere)
        let Tete=this.getPersonneNumNai (this.state.Numero_NaissanceTete)
    this.setState({P:{
        NumP: this.state.P.NumP,
        Numero_Naissance: this.state.P.Numero_Naissance,
        Nom: this.state.P.Nom,
        Prenom: this.state.P.Prenom,
        Sexe: this.state.P.Sexe,
        Date_Naissance: this.state.P.Date_Naissance,
        Heure_Naissance: this.state.P.Heure_Naissance,
        Lieu_de_Naissance: this.state.P.Lieu_de_Naissance,
        Pays_de_Naissance: this.state.P.Pays_de_Naissance,
        Situation_Marital: this.state.P.Situation_Marital,
        Adress: this.state.P.Adress,
        Etat_de_vie: this.state.P.Etat_de_vie,
        Profession: this.state.P.Profession,
        NumCommune: this.state.P.Commune,
        NumMere: Mere.NumP,
        NumPere: Pere.NumP,
        NumRegistre: 1,
        NumTet: Tete.NumP
    }})
    console.log(this.state.P)
    }
    setPdeath(){
        this.state.Pdeath.NumDeclarant=this.state.Declarent.NumP;
    }
/////////////////////////Actions in API
    updateClick(){
        this.setPersonne();
        this.setFamille();
        this.setPdeath();
        fetch(variables.API_URL+this.state.Personnetbl,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.P)
        })
        .then(res=>res.json())
        .then((result)=>{
        for(let i=0;i<this.state.PFamille.length;i++){
            console.log(this.state.PFamille[i]);
            fetch(variables.API_URL+this.state.Familletbl,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.PFamille[i])
            })
            .then(res=>res.json())
            .then((result)=>{
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
        console.log(this.state.Pdeath);
        fetch(variables.API_URL+this.state.deathtbl,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.Pdeath)
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result)
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Personne/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
///////////////////Print
    Print(id){
        var divContents = document.getElementById(id).innerHTML;
        var a = window.open('','');
        a.document.write('<html>');
        a.document.write('<head><title>print</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></head>');
        a.document.write('<body >');
        a.document.write(divContents);
        a.document.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> ');
        a.document.write('<script>window.print();window.close()</script>')
        a.document.write('</body></html>');
    }
    render(){
        const {
            Personne,
            Commune,
            P,
            Mere,
            Pere,
            Numero_NaissancePere,
            Numero_NaissanceMere,
            Numero_NaissanceTete,
            Numero_NaissancePartner,
            Numero_NaissanceDeclarent,
            Tete,
            GF1,
            GM1,
            GF2,
            GM2,
            Pdeath,
            Declarent,
            PFamille,
            PPartner,
            PCommune,
            F,
            PP,
            PPere,
            PMere,
            Annee,
            DDate,
            OffecierLog,
            Communeoff,
            eng,
            offeng
        }=this.state;

        return(
            
<div>
<br /><br /><br /><br />
            <div className="d-flex flex-row w-50"><span className="input-group m-2">Date De Mariage</span>
                <input className="form-control m-2" onChange={this.changePersonneYearMariageFilter} placeholder="Filter"/>
                <button className="btn btn-info m-2" value={" "} onClick={this.changePersonneYearMariageFilter}>Personne Marie</button>
            </div>
            <div className="d-flex flex-row w-50"><span className="input-group m-2">Date De Decce</span>
                <input className="form-control m-2" onChange={this.changePersonneYearDeathFilter} placeholder="Filter"/>
                <button className="btn btn-info m-2" value={" "} onClick={this.changePersonneYearDeathFilter}>Personne decce</button>
            </div>
            <div className="d-flex flex-row w-100">
            <div className="d-flex flex-row w-50"><span className="input-group m-2">Date De Naissnace</span>
                <input className="form-control m-2" onChange={this.changePersonneyearFilter} placeholder="Filter"/>
                    <button className="btn btn-info m-2" value={" "} onClick={this.changelive}>Personne vivent</button> 
            </div>
            <div className="d-flex flex-row w-25">           
                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Date_Naissance',true)}>
                        <i className="bi-arrow-down-circle-fill"></i>
                    </button>
                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Date_Naissance',false)}>
                        <i className="bi-arrow-up-circle-fill"></i>
                    </button>
            </div>
            </div>
            <button className="btn btn-secondary m-2" onClick={this.refrech}><i className="bi-arrow-clockwise"></i></button>
    <table className="table table-striped"style={{minHeight: 366}}>
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
                <input className="form-control m-2" onChange={this.changePersonnePrenomFilter} placeholder="Filter"/>
                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Prenom',true)}>
                        <i className="bi-arrow-down-circle-fill"></i>
                    </button>

                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Prenom',false)}>
                        <i className="bi-arrow-up-circle-fill"></i>
                    </button>
            </div>
            Prenom
        </th>
        <th>
            <div className="d-flex flex-row">
                <input className="form-control m-2" onChange={this.changePersonneNomFilter} placeholder="Filter"/>
                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',true)}>
                        <i className="bi-arrow-down-circle-fill"></i>
                    </button>
                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',false)}>
                        <i className="bi-arrow-up-circle-fill"></i>
                    </button>
            </div>
            Nom
        </th>
        <th>
            Date de Naissance
        </th>
        <th></th>
    </tr>
    </thead>
    <tbody>
        {Personne.map(P=>
            <tr key={P.NumP}>
                <td>{P.Prenom}</td>
                <td>{P.Nom}</td>
                <td>{P.Date_Naissance}</td>
                <td>
                <button type="button" className="btn btn-light mr-1"
                data-bs-toggle="modal" data-bs-target="#PersonneForm" onClick={()=>this.editClick(P)}>
                    <i className="bi-pencil-square"></i>
                </button>

                <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(P.NumP)}>
                    <i className="bi-trash"></i>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

    <div className="modal fade" id="PersonneForm" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ></button>
        </div>

        <div className="modal-body">
            <div className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 w-100 bd-highlight  p-2">
                <h4>Information Personel</h4>
            {P!=null?<>
                <div className="input-group mb-3">
                    <span className="input-group-text">Numero Nationale</span>
                    <input type="text" className="form-control"value={P.Numero_Naissance}onChange={this.changeNumero_Naissance}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Name</span>
                    <input type="text" className="form-control"value={P.Nom}onChange={this.changePersonneNom}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Prenom</span>
                    <input type="text" className="form-control"value={P.Prenom}onChange={this.changePersonnePreNom}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Sexe</span>
                    <select className="form-control"value={P.Sexe}onChange={this.changeSexe}>
                        <option value="Homme">Homme</option>
                        <option value="Famme">Famme</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Date de Naissance</span>
                    <input type="Date" className="form-control"value={P.Date_Naissance}onChange={this.changeDate_Naissance}/>
                    <input type="Time" className="form-control"value={P.Heure_Naissance}onChange={this.changeH_Naissance}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Lieu de Naissance</span>
                    <input type="text" className="form-control"value={P.Lieu_de_Naissance}onChange={this.changeLieu_de_Naissance}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Pays de Naissance</span>
                    <input type="text" className="form-control"value={P.Pays_de_Naissance}onChange={this.changePays_de_Naissance}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Adress</span>
                    <input type="text" className="form-control"value={P.Adress}onChange={this.changeAdress}/>
                    <select type="text" className="form-control"value={P.NumCommune}onChange={this.changeCommune}>
                        {Commune.map(C=><option key={C.id} value={C.id}>
                        {C.Commune+" "+C.Daira+" "+C.Wilaya}
                        </option>)}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Profession</span>
                    <input type="text" className="form-control"value={P.Profession}onChange={this.changeProfession}/>
                </div>
                <button data-bs-toggle="modal" data-bs-target="#ActeNaissance" className="btn btn-info"onClick={()=>this.setActeNaissance()}>Acte de Naissance</button>
                <hr/>
                <details><summary><h4>Information Parentaile</h4></summary>
                <div className="input-group p-1">
                <span className="p-2">fils (fille) de</span>
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissancePere}onChange={this.changeNumeroNaiPere}/>
                {Pere!=null?<>
                    <input type="text" className="form-control"value={Pere.Nom}onChange={this.changeNomPere}/>
                    <input type="text" className="form-control"value={Pere.Prenom}onChange={this.changePrenomPere}/>
                {GF1!=null&&GM1!=null?<>
                <div className="input-group p-1">
                    <span className="p-2">fils de</span>
                    <input type="text" className="form-control"value={GF1.Nom}onChange={this.changeNomGF1}/>
                    <input type="text" className="form-control"value={GF1.Prenom}onChange={this.changePrenomGF1}/>
                    <span className="p-2">et</span>
                    <input type="text" className="form-control"value={GM1.Nom}onChange={this.changeNomGM1}/>
                    <input type="text" className="form-control"value={GM1.Prenom}onChange={this.changePrenomGM1}/>
                </div></>:null}
                </>:null}</div>
                <div className="input-group p-1">
                <span className="p-2">et</span>
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissanceMere}onChange={this.changeNumeroNaiMere}/>
                {Mere!=null?<>
                    <input type="text" className="form-control"value={Mere.Nom}onChange={this.changeNomMere}/>
                    <input type="text" className="form-control"value={Mere.Prenom}onChange={this.changePrenomMere}/>
                {GF2!=null&&GM2!=null?<>
                <div className="input-group mb- p-1">
                    <span className="p-2" >fille de</span>
                    <input type="text" className="form-control"value={GF2.Nom}onChange={this.changeNomGF2}/>
                    <input type="text" className="form-control"value={GF2.Prenom}onChange={this.changePrenomGF2}/>
                    <span className="p-2">et</span>
                    <input type="text" className="form-control"value={GM2.Nom}onChange={this.changeNomGM2}/>
                    <input type="text" className="form-control"value={GM2.Prenom}onChange={this.changePrenomGM2}/>
                </div></>:null}
                </>:null}</div></details>
                </>:null}
                <div className="input-group mb-3">
                <span className="input-group-text">Tet</span>
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissanceTete}onChange={this.changeNumeroNaiTete}/>
                {Tete!=null?<>
                    <input type="text" className="form-control"value={Tete.Nom}onChange={this.changeNomTet}/>
                    <span className="input-group-text">Prenom Tet</span>
                    <input type="text" className="form-control"value={Tete.Prenom}onChange={this.changePrenomTet}/>
                </>:null}</div>
                <hr/>
                <details><summary><h4>Mariage</h4></summary>
                {PFamille!=null&&PFamille.length>0&&PPartner!=null&&PPartner.length>0?<>
                    
                    {PFamille.map((F,i)=><>
                        <div className="input-group mb-3">
                        <span className="input-group-text">Mariée avec</span>
                        <span className="input-group-text">Numero Nationale</span>
                        <input type="text" className="form-control"a-key={i} value={Numero_NaissancePartner[i]}onChange={this.changeNumeroNaiPartner}/>
                        {PPartner[i][0]!=null?<>
                        <input type="text" className="form-control"a-key={i} value={PPartner[i][0].Nom}onChange={null}/>
                        <input type="text" className="form-control"a-key={i} value={PPartner[i][0].Prenom}onChange={null}/></>:null}
                        </div>
                       <div className="input-group mb-3">
                        <span className="input-group-text">Date De Mariage</span>
                        <input type="date" className="form-control"a-key={i} value={F.Date_Mariage}onChange={this.changeDateMariage}/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text">Lieu De Mariage</span>
                        <input type="text" className="form-control"a-key={i} value={F.lieu_Mariage}onChange={this.changeLieuMariage}/>
                        </div>
                        <button data-bs-toggle="modal" data-bs-target="#ActeMariage"  className="btn btn-info"onClick={()=>this.setActeMariage(F,PPartner[i][0])}>Acte de Mariage</button>
                      </>)}
                </>:null}</details>
                <hr/><details><summary><h4> information de Décès</h4></summary>
                {Pdeath!=null?<>
                        <div className="input-group mb-3">
                        <span className="input-group-text">Date de Décès</span>
                        <input type="date" className="form-control"value={Pdeath.Date_Deces}onChange={this.changeDateDecee}/>
                        <input type="Time" className="form-control"value={Pdeath.Heure_Deces}onChange={this.changeHDecee}/>
                        </div>     
                        <div className="input-group mb-3">
                        <span className="input-group-text">Lieu de Décès</span>
                        <input type="text" className="form-control"value={Pdeath.Lieu_de_Deces}onChange={this.changeLieueDecee}/>
                        </div>  
                        <div className="input-group mb-3">
                        <span className="input-group-text">Cause de Décès</span>
                        <input type="text" className="form-control"value={Pdeath.Cause_Deces}onChange={this.changeCauseDecee}/>
                        </div>  snap
                        <div className="input-group mb-3">
                        <span className="input-group-text">Declarant</span>
                        <span className="input-group-text">Numero Nationale</span>
                        <input type="text" className="form-control" value={Numero_NaissanceDeclarent}onChange={this.changeNumeroNaiDeclarent}/>
                        {Declarent!=null?<>
                        <input type="text" className="form-control"value={Declarent.Nom}onChange={this.changeDeclarantNameDecee}/>
                        <input type="text" className="form-control"value={Declarent.Prenom}onChange={this.changeDeclarantPrenomDecee}/>
                        </>:null}
                        </div>  
                        <button data-bs-toggle="modal" data-bs-target="#ActeDcee"  className="btn btn-info"onClick={()=>this.setActeDecee()}>Acte de Décès</button>
                </>:null}</details>
                <button type="button" className="btn btn-primary float-start"onClick={()=>this.updateClick()}>Update</button>
            </div>
        </div>

        </div>
        </div> 
        </div>
    </div>

    <div className="modal fade" id="ActeNaissance" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <button type="button" className="btn bg-light"  onClick={()=>this.Print("N")}><i className="bi-printer"></i></button>
        </div>
        <div id='N'>
            <hr style={{color: "blue",backgroundColor: "blue",height: 5}}/>
                <div className="input-group">
                        <ul className='w-25 text-center'>
                            {Communeoff!==null?<li className="input-group"><small className='text-primary'>Wilaya :</small> {Communeoff.Wilaya}<small></small></li>:null}
                            {Communeoff!==null?<li className="input-group"><small className='text-primary'>Daira :</small> {Communeoff.Daira}<small></small></li>:null}
                            {Communeoff!==null?<li className="input-group"><small className='text-primary'>Commune :</small> {Communeoff.Commune}<small></small></li>:null}
                        </ul>
                        <div className='w-75'>
                            <h4 className='text-primary text-center'>République algérienne démocratique et populaire</h4>
                            <h4 className='text-primary text-center'>Extrait d'acte de Naissance</h4>
                        </div>
                </div>
                <hr style={{color: "blue",backgroundColor: "blue",height: 5}}/>
                <div className="input-group p-5">
                        <div className='w-25'>
                        <li className="input-group p-1"><small className='text-primary p-1'>Registre N°</small><small> {" 3"+P.NumCommune+Annee}</small></li>
                        <li className="input-group p-1"><small className='text-primary p-1'>Annee</small> <small> {Annee}</small></li>
                        </div>
                        <div className='w-75'>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Le </h6>{P.Date_Naissance} <h6></h6></span>
                        {PCommune!==null?<span className="d-flex justify-content-between"><h6 className='m-1'>à</h6> {P.Heure_Naissance}<h6>Être né a</h6> {PCommune.Commune}</span>:null}
                        {PCommune!==null?<span className="d-flex justify-content-between"><h6 className='m-1'>Commune</h6> {PCommune.Commune} <h6>Wilaya</h6>{PCommune.Wilaya}</span>:null}
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Nommé</h6> {P.Nom+" "+P.Prenom}<h6></h6></span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Sexe</h6> {P.Sexe}<h6></h6></span>
                        {Pere!=null?<span className="d-flex justify-content-between"><h6 className='m-1'>fils de</h6> {Pere.Nom+" "+Pere.Prenom}<h6>ne</h6>{Pere.Date_Naissance}<h6>Sa profession</h6>{Pere.Profession}</span>:null}
                        {Mere!=null?<span className="inpuut-group d-flex justify-content-between"><h6 className='m-1'>et De </h6>{Mere.Nom+" "+Mere.Prenom}<h6>ne</h6>{Mere.Date_Naissance}<h6>Sa profession</h6>{Mere.Profession}</span>:null}
                        <span className="d-flex justify-content-between"></span>
                        <span className="d-flex justify-content-between"><h6 className='m-1 mb-4'>habitant </h6>{P.Adress}<h6></h6></span>
                        {eng!==null?<span className="d-flex justify-content-between"><h6 className='m-1'>rédiger</h6>{eng.Date_E}  <h6>à</h6>{eng.Heure_E}</span>:null}
                        {offeng!==null?<span className="d-flex justify-content-between"><h6 className='m-1 mb-4'>L'annonce a été faite par M. </h6>{offeng.Nom+" "+offeng.Prenom}<h6></h6></span>:null}
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Après la récitation, il est tombé avec nous </h6>{OffecierLog.Nom+" "+OffecierLog.Prenom}</span>
                        <span className="d-flex justify-content-between mb-3"><h6>Officier d'état civil</h6></span>
                        <div className="pb-2"> <h6>mention marginales:</h6>................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        {Communeoff!==null?<span className="d-flex justify-content-between"><h6 className='w-25'></h6><h6>rédiger</h6>{Communeoff.Commune}<h6 className='m-1'>Le</h6>{DDate}</span>:null}
                        </div>
                </div>
                <hr style={{color: "blue",backgroundColor: "blue",height: 5}}/>
            </div>     
        </div> 
        </div>
    </div>

    <div className="modal fade" id="ActeMariage" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <button type="button" className="btn bg-light"  onClick={()=>this.Print("M")}><i className="bi-printer"></i></button>
        </div>
            <div id='M'>
            <hr style={{color: "blue",backgroundColor: "blue",height: 5}}/>
                <div className="input-group">
                <ul className='w-25 text-center'>
                            {Communeoff!==null?<li className="input-group"><small className='text-primary'>Wilaya :</small> {Communeoff.Wilaya}<small></small></li>:null}
                            {Communeoff!==null?<li className="input-group"><small className='text-primary'>Daira :</small> {Communeoff.Daira}<small></small></li>:null}
                            {Communeoff!==null?<li className="input-group"><small className='text-primary'>Commune :</small> {Communeoff.Commune}<small></small></li>:null}
                        </ul>
                        <div className='w-75'>
                            <h4 className='text-primary text-center'>République algérienne démocratique et populaire</h4>
                            <h4 className='text-primary text-center'>Extrait d'acte de Mariage</h4>
                        </div>
                </div>
                <hr style={{color: "blue",backgroundColor: "blue",height: 5}}/>
                <div className="input-group p-5">
                        <div className='w-25'>
                        <li className="input-group p-1"><small className='text-primary p-1'>Registre N°</small><small> {" 3"+P.NumCommune+Annee}</small></li>
                        <li className="input-group p-1"><small className='text-primary p-1'>Annee</small> <small> {Annee}</small></li>
                        </div>
                        <div className='w-75'>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Le </h6>{F.Date_Mariage} <h6>a </h6>{F.lieu_Mariage}</span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>a été célébré le mariage</h6><h6>De personne 1</h6> {P.Nom+" "+P.Prenom}</span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>ne Le</h6> {P.Date_Naissance} a {P.Lieu_de_Naissance}<h6></h6></span>
                        {Pere!=null?<span className="d-flex justify-content-between"><h6 className='m-1'>fils de</h6> {Pere.Nom+" "+Pere.Prenom}<h6></h6></span>:null}
                        {Mere!=null?<span className="inpuut-group d-flex justify-content-between"><h6 className='m-1'>et De </h6>{Mere.Nom+" "+Mere.Prenom}<h6></h6></span>:null}
                        <span className="d-flex justify-content-between"></span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>ET DE personne 2</h6>{PP.Nom+" "+PP.Prenom}<h6></h6></span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>ne le </h6>{PP.Date_Naissance} a {PP.Lieu_de_Naissance}<h6></h6></span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>fils de </h6>{PPere.Nom+" "+PPere.Prenom}<h6></h6></span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>et de </h6>{PMere.Nom+" "+PMere.Prenom}<h6></h6></span>
                        <span className="d-flex justify-content-between"></span>
                        {eng!==null?<span className="d-flex justify-content-between"><h6 className='m-1'>rédiger</h6>{eng.Date_E}  <h6>à</h6>{eng.Heure_E}</span>:null}
                        {offeng!==null?<span className="d-flex justify-content-between"><h6 className='m-1 mb-4'>L'annonce a été faite par M. </h6>{offeng.Nom+" "+offeng.Prenom}<h6></h6></span>:null}
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Après la récitation, il est tombé avec nous </h6>{OffecierLog.Nom+" "+OffecierLog.Prenom}</span>
                        <span className="d-flex justify-content-between mb-3"><h6>Officier d'état civil</h6></span>
                        
                        <div className="pb-2"><h6>mention marginale:</h6> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <span className="d-flex justify-content-between"></span>
                        {Communeoff!==null?<span className="d-flex justify-content-between"><h6 className='w-25'></h6><h6>rédiger</h6>{Communeoff.Daira}<h6 className='m-1'>Le</h6>{DDate}</span>:null}
                        </div>
                </div>
                <hr style={{color: "blue",backgroundColor: "blue",height: 5}}/>
            </div>
        </div> 
        </div>
    </div>

    <div className="modal fade" id="ActeDcee" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <button type="button" className="btn bg-light"  onClick={()=>this.Print("D")}><i className="bi-printer"></i></button>
        </div>
        {Pdeath!=null?<div id='D'>
            <hr style={{color: "blue",backgroundColor: "blue",height: 5}}/>
                <div className="input-group">
                        <ul className='w-25 text-center'>
                            {Communeoff!==null?<li className="input-group"><small className='text-primary'>Wilaya :</small> {Communeoff.Wilaya}<small></small></li>:null}
                            {Communeoff!==null?<li className="input-group"><small className='text-primary'>Daira :</small> {Communeoff.Daira}<small></small></li>:null}
                            {Communeoff!==null?<li className="input-group"><small className='text-primary'>Commune :</small> {Communeoff.Commune}<small></small></li>:null}
                        </ul>
                        <div className='w-75'>
                            <h4 className='text-primary text-center'>République algérienne démocratique et populaire</h4>
                            <h4 className='text-primary text-center'>Extrait d'acte de décès</h4>
                        </div>
                </div>
                <hr style={{color: "blue",backgroundColor: "blue",height: 5}}/>
                <div className="input-group p-5">
                        <div className='w-25'>
                        <li className="input-group p-1"><small className='text-primary p-1'>Registre N°</small><small> {" 3"+P.NumCommune+Annee}</small></li>
                        <li className="input-group p-1"><small className='text-primary p-1'>Annee</small> <small> {Annee}</small></li>
                        </div>
                        <div className='w-75'>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Le </h6>{Pdeath.Date_Deces} <h6>à</h6> {Pdeath.Heure_Deces}</span>
                        {PCommune!==null?<span className="d-flex justify-content-between"><h6 className='m-1'>a</h6> {Pdeath.Lieu_de_Deces}<h6></h6></span>:null}
                        <span className="d-flex justify-content-between"><h6 className='m-1'>le décès de</h6> {P.Nom+" "+P.Prenom}<h6></h6></span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>ne le</h6> {P.Date_Naissance}<h6>a</h6>{P.Lieu_de_Naissance}</span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Sexe</h6> {P.Sexe}<h6></h6></span>
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Profession</h6> {P.Profession}<h6></h6></span>
                        {Pere!=null?<span className="d-flex justify-content-between"><h6 className='m-1'>fils de</h6> {Pere.Nom+" "+Pere.Prenom} <h6> {Pere.Etat_de_vie===false?<>décédé</>:null}</h6></span>:null}
                        {Mere!=null?<span className="inpuut-group d-flex justify-content-between"><h6 className='m-1'>et De </h6>{Mere.Nom+" "+Mere.Prenom}<h6>{Mere.Etat_de_vie===false?<>décédé</>:null}</h6></span>:null}
                        <span className="d-flex justify-content-between"></span>
                        <span className="d-flex justify-content-between"><h6 className='m-1 mb-4'>habitant </h6>{P.Adress}<h6></h6></span>
                        {eng!==null?<span className="d-flex justify-content-between"><h6 className='m-1'>rédiger</h6>{eng.Date_E}  <h6>à</h6>{eng.Heure_E}</span>:null}
                        {offeng!==null?<span className="d-flex justify-content-between"><h6 className='m-1 mb-4'>L'annonce a été faite par M. </h6>{offeng.Nom+" "+offeng.Prenom}<h6></h6></span>:null}
                        <span className="d-flex justify-content-between"><h6 className='m-1'>Après la récitation, il est tombé avec nous </h6>{OffecierLog.Nom+" "+OffecierLog.Prenom}</span>
                        <span className="d-flex justify-content-between mb-3"><h6>Officier d'état civil</h6></span>
                        <div className="pb-2"> <h6>mention marginales:</h6>................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        <div className="pb-2"> ................................................................................................................................................ </div>
                        {Communeoff!==null?<span className="d-flex justify-content-between"><h6 className='w-25'></h6><h6>rédiger</h6>{Communeoff.Commune}<h6 className='m-1'>Le</h6>{DDate}</span>:null}
                        </div>
                </div>
                <hr style={{color: "blue",backgroundColor: "blue",height: 5}}/>
            </div> :null} 
        </div> 
        </div>
    </div>

</div>
        )
    }
}