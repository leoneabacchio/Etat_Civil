import React,{Component} from 'react';
import {variables} from '../Variables.js';
import { Personne } from './Personne.jsx';
export class Action extends Component{

	constructor(props){
        super(props);

        this.state={
            Personne:[],
            famille:{},
            Famille:[],
            Death:[],
            Commune:[],

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
            Numero_NaissanceHomme:"",
            Numero_NaissanceFamme:"",
            Numero_NaissanceTem1:"",
            Numero_NaissanceTem2:"",
            Numero_NaissanceP:"",
            Numero_NaissanceDec:"",
            GF1:[],
            GM1:[],
            GF2:[],
            GM2:[],
            Pdeath:{},
            PCommune:[],
            live:"",

            /////info de famille
            P1:[],
            P2:[],
            Tem1:[],
            Tem2:[],
            Mere1:[],
            Pere1:[],
            Mere2:[],
            Pere2:[],
            ///////info de deces 
            Dec:{},
            Pd:{},
            offMat:0,
            Personnetbl:'Personne',
            Familletbl:'Famille',
            deathtbl:'PersonneDeces',
            Communetbl:'Commune',
            enregistrementtbl:'engeristrement'
        }
    }
    refreshList(){
        fetch(variables.API_URL+this.state.Personnetbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Personne:data})
        });
        fetch(variables.API_URL+this.state.Familletbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Famille:data})
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
        });
    }
    //////////////get data
    getPersonne(NumP){
        let P= this.state.Personne.filter(function(el){
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
            if(el.NumP==P.NumP)return el;
        });
        this.state.Pdeath= Pdeath[0];
        this.state.Declarent= this.getPersonne(Pdeath[0].NumDeclarant);
        console.log(this.state.Pdeath)
        }
        else this.state.Pdeath= null;
    }
    getPersonneNOMPRENOM(Nom,Prenom){
        let X= this.state.Personne.filter(function(el){
            if(el.Nom==Nom&&el.Prenom==Prenom)return el;
        });
        if(X.length==1)return X[0];
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
        for(let i=0;i<this.state.PFamille.length;i++){
        this.state.PPartner= this.state.PersonneWithoutFilter.filter(function(el){
            if(Sexe=="Homme"){if(el.NumP==PFamille[i].NumFamme)return el;
            }else if(el.NumP==PFamille[i].NumHomme)return el;
        })
    }}
    }
    getCommune(NumC){
        return this.state.Commune.filter(function(el){
            if(el.id==NumC)return el;
        });
    }
    maxNumP(){
        let max=0;
        this.refreshList();
        this.state.Personne.map(el=>{
            if(max<el.NumP)max=el.NumP;
        })
        return max;
    }
    ///////////////////////////change with numero naissance
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
    changeNumeroNaiHomme=(e)=>{
        this.setState({Numero_NaissanceHomme:e.target.value});
        this.state.P1=this.getPersonneNumNai(e.target.value);
        this.setState({
            Pere1:this.getGPere(this.state.P1.NumP),
            Mere1:this.getGMere(this.state.P1.NumP),
        });
    }
    changeNumeroNaiFamme=(e)=>{
        this.setState({Numero_NaissanceFamme:e.target.value});
        this.state.P2=this.getPersonneNumNai(e.target.value);
        this.setState({
            Pere2:this.getGPere(this.state.P2.NumP),
            Mere2:this.getGMere(this.state.P2.NumP),
        });
    }
    changeNumeroNaiTem1=(e)=>{
        this.setState({Numero_NaissanceTem1:e.target.value});
        this.state.Tem1=this.getPersonneNumNai(e.target.value);
    }
    changeNumeroNaiTem2=(e)=>{
        this.setState({Numero_NaissanceTem2:e.target.value});
        this.state.Tem2=this.getPersonneNumNai(e.target.value);
    }
    changeNumero_NaissanceP=(e)=>{
        this.setState({Numero_NaissanceP:e.target.value});
        this.state.Pd=this.getPersonneNumNai(e.target.value);
    }
    changeNumero_NaissanceDec=(e)=>{
        this.setState({Numero_NaissanceDec:e.target.value});
        this.state.Dec=this.getPersonneNumNai(e.target.value);
    }
    /////////////////////add
    setPersonne(){
        let NP=this.maxNumP()+1;
        if(NP<10)NP="0"+NP;
        let NPere=this.state.Pere.NumP;
        if(NPere<10)NPere="0"+NPere;
        let NMere=this.state.Mere.NumP;
        if(NMere<10)NMere="0"+NMere;
        let NC=this.props.Communeoff;
        if(NC<10)NC="0"+NC;
        this.state.P.Numero_Naissance=""+1+NP+NPere+NMere+NC;
        this.state.P.Situation_Marital=false;
        this.state.P.Etat_de_vie=true;
        this.state.P.NumCommune=this.props.Communeoff;
        this.state.P.NumMere=this.state.Mere.NumP;
        this.state.P.NumPere=this.state.Pere.NumP;
        this.state.P.NumTet=this.state.Tete.NumP;
        this.state.P.Pays_de_Naissance='Algeria';
    }
	createClickNaissance(){
        this.state.Pere=this.getPersonneNumNai (this.state.Pere.Numero_Naissance)
        this.state.Mere=this.getPersonneNumNai (this.state.Mere.Numero_Naissance)
        this.state.Tete=this.getPersonneNumNai (this.state.Tete.Numero_Naissance)

        if(this.state.Pere!=null&&this.state.Mere!=null&&this.state.Tete!=null)this.setPersonne();
        let cond=1;
        if(this.state.Pere.Sexe!=="Homme"||this.state.Mere.Sexe!=="Famme"){
            cond=0;
            alert("Sexe invalide")
        }
        if(this.state.P.Date_Naissance>this.getDate()){
            cond=0;
            alert("la date faut etre passé")
        }
        if(cond===1){
        fetch(variables.API_URL+this.state.Personnetbl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.P)
        })
        .then(res=>res.json())
        .then((result)=>{
            if(result=="Added Successfully")
            fetch(variables.API_URL+this.state.enregistrementtbl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    cle: this.maxNumP()+1,
                    Date_E: this.getDate(),
                    Heure_E: this.getTime(),
                    NumRegistre: 1,
                    NumOff: this.props.offlog[0].NumOff
                })
            })
            .then(res=>res.json())
            .then((result)=>{       
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        },(error)=>{
            alert('Failed');
        })
    }
        this.addClickPersonne();
    }
    setMariage(){
        this.state.famille.NumHomme=this.state.P1.NumP;
        this.state.famille.NumFamme=this.state.P2.NumP;
        this.state.famille.NumTem1=this.state.Tem1.NumP;
        this.state.famille.NumTem2=this.state.Tem1.NumP;

        this.state.P1.Situation_Marital=true;
        this.state.P2.Situation_Marital=true;
    }
    createClickMariage(){
        this.state.Homme=this.getPersonneNumNai (this.state.P1.Numero_Naissance)
        this.state.Famme=this.getPersonneNumNai (this.state.P2.Numero_Naissance)
        this.state.Tem1=this.getPersonneNumNai (this.state.Tem1.Numero_Naissance)
        this.state.Tem2=this.getPersonneNumNai (this.state.Tem2.Numero_Naissance)
        if(this.state.Homme!=null&&this.state.Famme!=null&&this.state.Tem1!=null&&this.state.Tem2!=null)this.setMariage();
        let cond=1;
        if(this.state.Famme.Sexe!=="Famme"||this.state.Homme.Sexe!=="Homme"){
            cond=0;
            alert("Sexe invalide")
        }
        if(this.state.Tem1.NumP===this.state.Tem2.NumP){
            cond=0;
            alert("il faut deux témoins")
        }
        if(this.state.famille.Date_Mariage>this.getDate()){
            cond=0;
            alert("la date faut etre passé")
        }
        if(cond===1){
        fetch(variables.API_URL+this.state.Familletbl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.famille)
        })
        .then(res=>res.json())
        .then((result)=>{       
            alert(result);
            if(result=="Added Successfully"){
                fetch(variables.API_URL+this.state.Personnetbl,{
                    method:'PUT',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(this.state.P1)
                })
                .then(res=>res.json())
                .then((result)=>{
                },(error)=>{
                    alert('Failed');
                })
                fetch(variables.API_URL+this.state.Personnetbl,{
                    method:'PUT',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(this.state.P2)
                })
                .then(res=>res.json())
                .then((result)=>{
                },(error)=>{
                    alert('Failed');
                })
                fetch(variables.API_URL+this.state.enregistrementtbl,{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        cle: this.maxNumF()+1,
                        Date_E: this.getDate(),
                        Heure_E: this.getTime(),
                        NumRegistre: 2,
                        NumOff: this.props.offlog[0].NumOff
                    })
                })
                .then(res=>res.json())
                .then((result)=>{   
                },(error)=>{
                    alert('Failed');
                })
            }
                this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    }
    setDeces(){
        this.state.Pdeath.NumP=this.state.Pd.NumP
        this.state.Pdeath.NumDeclarant=this.state.Dec.NumP;

        this.state.Pd.Etat_de_vie=false;
    }
    createClickDeces(){
        this.state.Pd=this.getPersonneNumNai (this.state.Pd.Numero_Naissance)
        this.state.Dec=this.getPersonneNumNai (this.state.Dec.Numero_Naissance)
        if(this.state.Pd!=null&&this.state.Dec!=null)this.setDeces();
        let cond=1;
        if(this.state.Pdeath.Date_Deces>this.getDate()){
            cond=0;
            alert("la date faut etre passé")
        }
        if(cond===1){
        fetch(variables.API_URL+this.state.deathtbl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.Pdeath)
        })
        .then(res=>res.json())
        .then((result)=>{       
            alert(result);
            if(result=="Added Successfully"){
                    fetch(variables.API_URL+this.state.Personnetbl,{
                        method:'PUT',
                        headers:{
                            'Accept':'application/json',
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(this.state.Pd)
                    })
                    .then(res=>res.json())
                    .then((result)=>{       
                        alert(result);
                        this.refreshList();
                    },(error)=>{
                        alert('Failed');
                    })
                    fetch(variables.API_URL+this.state.enregistrementtbl,{
                        method:'POST',
                        headers:{
                            'Accept':'application/json',
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            cle: this.maxNumD()+1,
                            Date_E: this.getDate(),
                            Heure_E: this.getTime(),
                            NumRegistre: 3,
                            NumOff: this.props.offlog[0].NumOff
                        })
                    })
                    .then(res=>res.json())
                    .then((result)=>{       
                    },(error)=>{
                        alert('Failed');
                    })
            }
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    }
	addClickPersonne(){
        this.setState({
			P:{
                Numero_Naissance:"" ,
                Nom:"" ,
                Prenom:"" ,
                Sexe:"" ,
                Date_Naissance: "",
                Heure_Naissance:"" ,
                Lieu_de_Naissance: "",
                Pays_de_Naissance: "",
                Situation_Marital:"" ,
                Adress:"" ,
                Etat_de_vie: "",
                Profession: "///",
                NumCommune: "",
                NumMere: 1,
                NumPere: 1,
                NumTet: 1
            },	
        });
    }
    /////////////////////////////change simple
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
    changeDate_Deces=(e)=>{
        let X=this.state.Pdeath;
        X.Date_Deces=e.target.value;
        this.setState({Pdeath:X});
    }
    changeHeure_Naissance=(e)=>{
        let X=this.state.P;
        X.Heure_Naissance=e.target.value;
        this.setState({P:X});
    }
    changeHeure_Deces=(e)=>{
        let X=this.state.Pdeath;
        X.Heure_Deces=e.target.value;
        this.setState({Pdeath:X});
    }
    changeLieu_de_Naissance=(e)=>{
        let X=this.state.P;
        X.Lieu_de_Naissance=e.target.value;
        this.setState({P:X});
    }
    changeLieu_Deces=(e)=>{
        let X=this.state.Pdeath;
        X.Lieu_de_Deces=e.target.value;
        this.setState({Pdeath:X})
        
    }
    changeCause_Deces=(e)=>{
        let X=this.state.Pdeath;
        X.Cause_Deces=e.target.value;
        this.setState({Pdeath:X})
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
        X.NumCommune=e.target.value;
        this.setState({P:X});
    }
    changeDateMariage=(e)=>{
        let X=this.state.famille;
        X.Date_Mariage=e.target.value;
        this.setState({famille:X});
    }
    changeLieuMariage=(e)=>{
        let X=this.state.famille;
        X.lieu_Mariage=e.target.value;
        this.setState({famille:X});
    }
    componentDidMount(){
        this.addClickPersonne();
        this.refreshList();
    }
    ////////////////////////////++
    getDate(){
        let currentdate=new Date()
        let month=currentdate.getMonth()+1;
        if(month<10)month="0"+month;
        let day=currentdate.getDate();
        if(day<10)day="0"+day;
       return ""+ currentdate.getFullYear()+"-"+ month  + "-" + day;
    }
    getTime(){
        var d = new Date();
        return d.toLocaleTimeString();
    }
    maxNumP(){
        let max=0;
        this.refreshList();
        this.state.Personne.map(P=>{
            if(max<P.NumP)max=P.NumP;
        })
        return max;
    }
    maxNumD(){
        let max=0;
        this.refreshList();
        this.state.Death.map(D=>{
            if(max<D.NumD)max=D.NumD;
        })
        return max;
    }
    maxNumF(){
        let max=0;
        this.refreshList();
        this.state.Famille.map(F=>{
            if(max<F.NumF)max=F.NumF;
        })
        return max;
    }
    render(){
       const {
        P,
        Mere,
        Pere,
        Tete,
        GF1,
        GM1,
        GF2,
        GM2,
        P1,
        P2,
        famille,
        Pere1,
        Mere1,
        Pere2,
        Mere2,
        Tem1,
        Tem2,
        Pdeath,
        Dec,
        Pd,
        Commune,
        Numero_NaissancePere,
        Numero_NaissanceMere,
        Numero_NaissanceTete,
        Numero_NaissanceHomme,
        Numero_NaissanceFamme,
        Numero_NaissanceTem1,
        Numero_NaissanceTem2,
        Numero_NaissanceP,
        Numero_NaissanceDec
       }=this.state;

        return(
            
            <div>
                <br></br><br></br><br></br><br></br><br></br>
                <div className="d-flex flex-column align-items-center">
                <button type="button" className="btn btn-outline-info m-3 p-5  w-50" 
                        data-bs-toggle="modal"data-bs-target="#PersonneForm" 
                        onClick={()=>this.addClickPersonne()} style={{color: "#008080"}}>
                        <h3> Ajouter Un Nouveau Ne</h3>
                 </button>
                 <button type="button" className="btn btn-outline-info m-3 p-5 float w-50" 
                        data-bs-toggle="modal"data-bs-target="#MariageForm" 
                        onClick={null}style={{color: "#008080"}}>
                        <h3> Ajouter Un Nouveau Mariage</h3>
                 </button>
                 <button type="button" className="btn btn-outline-info m-3 p-5 float w-50" 
                        data-bs-toggle="modal"data-bs-target="#DecesForm" 
                        onClick={null}style={{color: "#008080"}}>
                        <h3> Ajouter Un Nouveau Dece</h3>
                 </button>
                 </div>

 
    <div className="modal fade" id="PersonneForm" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header"> 
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <div className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 w-75 bd-highlight">
            <h3 className='text-center'>Nouveau Ne</h3>
                <div className="input-group mb-3">
                    <span className="input-group-text">Nom</span>
                    <input type="text" className="form-control"value={P.Nom}onChange={this.changePersonneNom}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Prenom</span>
                    <input type="text" className="form-control"value={P.Prenom}onChange={this.changePersonnePreNom}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Sexe</span>
                    <select className="form-control"value={P.Sexe}onChange={this.changeSexe}>
                        <option value=""></option>
                        <option value="Homme">Homme</option>
                        <option value="Famme">Famme</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Date Naissance</span>
                    <input type="date" className="form-control"value={P.Date_Naissance}onChange={this.changeDate_Naissance}/>
                    <input type="time" className="form-control"value={P.Heure_Naissance}onChange={this.changeHeure_Naissance}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Lieu Naissance</span>
                    <input type="text" placeholder='Lieu' className="form-control"value={P.Lieu_de_Naissance}onChange={this.changeLieu_de_Naissance}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Adress</span>
                    <input type="text" className="form-control"value={P.Adress}onChange={this.changeAdress}/>
                </div>
                <h4> Pere</h4>
                <div className="input-group mb-3">
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissancePere}onChange={this.changeNumeroNaiPere}/>
                </div> 
                {Pere!=null?<><div className="input-group mb-3">
                    <input type="text" placeholder='Nom' className="form-control"value={Pere.Nom}onChange={null}/>
                    <input type="text" placeholder='Prenom' className="form-control"value={Pere.Prenom}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Date Naissance</span>
                    <input type="date" className="form-control"value={Pere.Date_Naissance}onChange={null}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Lieu Naissance</span>
                    <input type="text" className="form-control"value={Pere.Lieu_de_Naissance}onChange={null}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Profession</span>
                    <input type="text" className="form-control"value={Pere.Profession}onChange={null}/>
                </div></>:null}
                <h4>Mere</h4>
                <div className="input-group mb-3">
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissanceMere}onChange={this.changeNumeroNaiMere}/>
                </div>
                {Mere!=null?<><div className="input-group mb-3">
                    <input type="text" placeholder='Nom' className="form-control"value={Mere.Nom}onChange={null}/>
                    <input type="text" placeholder='Prenom' className="form-control"value={Mere.Prenom}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Date Naissance</span>
                    <input type="date" className="form-control"value={Mere.Date_Naissance}onChange={null}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Lieu Naissance</span>
                    <input type="text" className="form-control"value={Mere.Lieu_de_Naissance}onChange={null}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Profession</span>
                    <input type="text" className="form-control"value={Mere.Profession}onChange={null}/>
                </div></>:null}
                <h4>Tuteur</h4>
                <div className="input-group mb-3">
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissanceTete}onChange={this.changeNumeroNaiTete}/> 
                {Tete!=null?<>
                    <input type="text" placeholder='Nom' className="form-control"value={Tete.Nom}onChange={null}/>
                    <input type="text" placeholder='Prenom' className="form-control"value={Tete.Prenom}onChange={null}/>
                </>:null}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Grande Pere Paternel</span>
                    <input type="text" placeholder='Nom' className="form-control"value={GF1.Nom}onChange={null}/>
                    <input type="text" placeholder='Prenom' className="form-control"value={GF1.Prenom}onChange={null}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Grande Mere Paternel</span>
                    <input type="text" placeholder='Nom' className="form-control"value={GM1.Nom}onChange={null}/>
                    <input type="text" placeholder='Prenom' className="form-control"value={GM1.Prenom}onChange={null}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Grande Pere Maternel</span>
                    <input type="text" placeholder='Nom' className="form-control"value={GF2.Nom}onChange={null}/>
                    <input type="text" placeholder='Prenom' className="form-control"value={GF2.Prenom}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Grande Mere Maternel</span>
                    <input type="text" placeholder='Nom' className="form-control"value={GM2.Nom}onChange={null}/>
                    <input type="text" placeholder='Prenom' className="form-control"value={GM2.Prenom}onChange={null}/>
                </div>


            </div>
            </div>
                <button type="button"className="btn btn-primary float-start" onClick={()=>this.createClickNaissance()}>Create</button>
        </div>

        </div>
        </div> 
    </div>


    <div className="modal fade" id="MariageForm" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <div className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 bd-highlight">
            <h3 className='text-center'>Nouveau Mariage</h3>
            <h4>Information de Mariage</h4>
            <div className="input-group mb-3">
                    <span className="input-group-text">Date Mariage</span>
                    <input type="date" className="form-control"value={famille.Date_Naissance}onChange={this.changeDateMariage}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Lieu Mariage</span>
                    <input type="text" className="form-control"value={famille.Date_Naissance}onChange={this.changeLieuMariage}/>
                </div>
            <h4>information de Homme</h4>
                <div className="input-group mb-3">
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissanceHomme}onChange={this.changeNumeroNaiHomme}/>
                </div>
                {P1!=null?<>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder='Nom' value={P1.Nom}onChange={null}/>
                    <input type="text" className="form-control" placeholder='Prenom' value={P1.Prenom}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Date Naissance</span>
                    <input type="date" className="form-control"value={P1.Date_Naissance}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Lieu Naissance</span>
                    <input type="text" className="form-control"value={P1.Lieu_de_Naissance}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Profession</span>
                    <input type="text" className="form-control"value={P1.Profession}onChange={null}/>
                </div>

                <h5>Pere</h5>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder='Nom' value={Pere1.Nom}onChange={null}/>
                    <input type="text" className="form-control" placeholder='Prenom' value={Pere1.Prenom}onChange={null}/>
                </div>
                <h5>Mere</h5>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder='Nom' value={Mere1.Nom}onChange={null}/>
                    <input type="text" className="form-control" placeholder='Prenom' value={Mere1.Prenom}onChange={null}/>
                </div>
                </>:null}
                <h4>Information de Famme</h4>
                <div className="input-group mb-3">
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissanceFamme}onChange={this.changeNumeroNaiFamme}/>
                </div>
                {P2!=null?<>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder='Nom' value={P2.Nom}onChange={null}/>
                    <input type="text" className="form-control" placeholder='Prenom' value={P2.Prenom}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Date Naissance</span>
                    <input type="date" className="form-control"value={P2.Date_Naissance}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Lieu Naissance</span>
                    <input type="text" className="form-control"value={P2.Lieu_de_Naissance}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Profession</span>
                    <input type="text" className="form-control"value={P2.Profession}onChange={null}/>
                </div>
                <h5>Pere</h5>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder='Nom' value={Pere2.Nom}onChange={null}/>
                    <input type="text" className="form-control" placeholder='Prenom' value={Pere2.Prenom}onChange={null}/>
                </div>
                <h5>Mere</h5>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder='Nom' value={Mere2.Nom}onChange={null}/>
                    <input type="text" className="form-control" placeholder='Prenom' value={Mere2.Prenom}onChange={null}/>
                </div>
                </>:null}
                <h4>Temoinage 1</h4>
                <div className="input-group mb-3">
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissanceTem1}onChange={this.changeNumeroNaiTem1}/>
                </div>
                {Tem1!=null?<>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder='Nom' value={Tem1.Nom}onChange={null}/>
                    <input type="text" className="form-control" placeholder='Prenom' value={Tem1.Prenom}onChange={null}/>
                </div>
                </>:null}
                <h4>Temoinage 2</h4> 
                <div className="input-group mb-3">
                <span className="input-group-text">Numero Nationale</span>
                <input type="text" className="form-control"value={Numero_NaissanceTem2}onChange={this.changeNumeroNaiTem2}/>
                </div>
                {Tem2!=null?<>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder='Nom' value={Tem2.Nom}onChange={null}/>
                    <input type="text" className="form-control" placeholder='Prenom' value={Tem2.Prenom}onChange={null}/>
                </div>
                </>:null}
            </div>
            </div>
                <button type="button"className="btn btn-primary float-start" onClick={()=>this.createClickMariage()}>Create</button>
        </div>

        </div>
        </div> 
    </div>

    <div className="modal fade" id="DecesForm" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ></button>
        </div>

        <div className="modal-body">
            <div className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 w-75 bd-highlight">
                    <h4>Information Personne</h4>
                <div className="input-group mb-3">
                    <span className="input-group-text">Numero De Naissance</span>
                    <input type="text" className="form-control"value={Numero_NaissanceP}onChange={this.changeNumero_NaissanceP}/>
                </div>
                {Pd!=null?<>
                <div className="input-group mb-3">
                    <span className="input-group-text">Nom</span>
                    <input type="text" className="form-control"value={Pd.Nom}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Prenom</span>
                    <input type="text" className="form-control"value={Pd.Prenom}onChange={null}/>
                </div>
                </>:null}
                <h4>Information de Decee</h4>
                <div className="input-group mb-3">
                    <span className="input-group-text">Date De Deces</span>
                    <input type="date" className="form-control"value={Pdeath.Date_Naissance}onChange={this.changeDate_Deces}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Heure De Deces</span>
                    <input type="time" className="form-control"value={Pdeath.Heure_Naissance}onChange={this.changeHeure_Deces}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Lieu De Deces</span>
                    <input type="text" className="form-control"value={Pdeath.Date_Naissance}onChange={this.changeLieu_Deces}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Cause De Deces</span>
                    <input type="text" className="form-control"value={Pdeath.Date_Naissance}onChange={this.changeCause_Deces}/>
                </div>
                <h4>Declrant</h4>
                <div className="input-group mb-3">
                    <span className="input-group-text">Numero De Naissance</span>
                    <input type="text" className="form-control"value={Numero_NaissanceDec}onChange={this.changeNumero_NaissanceDec}/>
                </div>
                {Dec!=null?<>
                <div className="input-group mb-3">
                    <span className="input-group-text">Nom Declarant </span>
                    <input type="text" className="form-control"value={Dec.Nom}onChange={null}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Prenom Declarant</span>
                    <input type="text" className="form-control"value={Dec.Prenom}onChange={null}/>
                </div>
                </>:null}
            </div>
            
            </div>
                <button type="button"className="btn btn-primary float-start" onClick={()=>this.createClickDeces()}>Create</button> 
        </div>

        </div>
        </div> 
    </div>
</div>      

        )
    }
}




