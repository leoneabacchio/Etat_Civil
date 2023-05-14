import React,{Component} from 'react';
import {variables} from '../Variables.js';

export class Officier extends Component{

    constructor(props){
        super(props);

        this.state={
            Officier:[],
            Travaille:[],
            Bureau:[],
            BureauinCommune:[],
            Commun:[],
            commune:[],
            modalTitle:"",

            Matricule:0,
            MatOFF:"",
            OfficierNom:"",
            OfficierPreNom:"",
            Password:"",
            IDTravaille:0,
            DateOfdebut:"",
            DateOffin:"",
            Bureauoff:0,
            Bureauodl:0,
            PhotoFileName:"anonymous.png",

            PhotoPath:variables.PHOTO_URL,

            OfficierPrenomFilter:"",
            OfficierNomFilter:"",
            OfficierWithoutFilter:[],

            offMat:0,
            Officiertbl:'Officier',
            Travailletbl:'Travaille',
            Bureautbl:'Bureau',
            Communetbl:'Commune'
        }
    }
////////////////////////////filter
    FilterFn(){
        var OfficierPrenomFilter=this.state.OfficierPrenomFilter;
        var OfficierNomFilter = this.state.OfficierNomFilter;

        var filteredData=this.state.OfficierWithoutFilter.filter(
            function(el){
                return el.Prenom.toString().toLowerCase().includes(
                    OfficierPrenomFilter.toString().trim().toLowerCase()
                )&&
                el.Nom.toString().toLowerCase().includes(
                    OfficierNomFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Officier:filteredData});
    }

    sortResult(prop,asc){
        var sortedData=this.state.OfficierWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({Officier:sortedData});
    }

    changeOfficierPrenomFilter = (e)=>{
        this.state.OfficierPrenomFilter=e.target.value;
        this.FilterFn();
    }
    changeOfficierNomFilter = (e)=>{
        this.state.OfficierNomFilter=e.target.value;
        this.FilterFn();
    }
//////////////////////////get data from API
    refreshList(){
        fetch(variables.API_URL+this.state.Officiertbl)
        .then(response=>response.json())
        .then(data=>{
            let Mat=this.props.Matricule;
            let mat= data.filter(function(el){
                if(el.Matricule==Mat) return el;
            })
            let NumOFF=mat[0].NumOff;
            data=data.filter(function(el){
                if(el.Nummaire==NumOFF) return el;
            })
            this.setState({Officier:data,OfficierWithoutFilter:data});
        });
        fetch(variables.API_URL+this.state.Bureautbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Bureau:data});
        });
        fetch(variables.API_URL+this.state.Communetbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Commun:data});
            let C=this.getCommunelog();
            this.state.BureauinCommune=this.state.Bureau.filter(function(el){
                if(el.NumC==C[0].id) return el;
            })
            console.log(this.state.BureauinCommune);
        });
        fetch(variables.API_URL+this.state.Travailletbl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Travaille:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
//////////////////////set state var
    changeOfficierNom =(e)=>{
        this.setState({OfficierNom:e.target.value});
    }
    changeOfficierPreNom=(e)=>{
        this.setState({OfficierPreNom:e.target.value});
    }
    changeMatricule =(e)=>{
        this.setState({MatOFF:e.target.value});
    }
    changeDatedebut=(e)=>{
        this.setState({DateOfdebut:e.target.value});
    }
    changeOfficierPassword = (e)=>{
        this.setState({Password:e.target.value});
    }
    changeBureau = (e)=>{
        this.setState({Bureauoff:parseInt(e.target.value)});
    }
///////////////////////get Data
    getTravailleCurent(Numo){
        let tr= this.state.Travaille.filter(function(el){
            if(el.NumOff==Numo&&el.Date_Fin==null) return el;
        })
        return tr[0];
    }
    getNumOfflog(){
        let Mat=this.props.Matricule;
        let mat= this.state.Officier.filter(function(el){
            if(el.Matricule==Mat) return el;
        })
        return mat[0].NumOff;
    }
    getCommune(NumC){
        let commune= this.state.Commun.filter(function(el){
            if(el.id==NumC) return el;
        })
        this.state.commune[NumC]=commune[0].Commune+" "+commune[0].Daira+" "+commune[0].Wilaya;
    }
    getCommunelog(){
        let NumMaire=this.getNumOfflog();
        let C=this.state.Commun.filter(function(el){
            if(el.NumMaire==NumMaire) return el;
        })
        return C;
    }
///////////////////////pompe data actions
    addClick(){
        this.setState({
            modalTitle:"Add Officier",
            Matricule:0,
            MatOFF:"",
            OfficierNom:"",
            OfficierPreNom:"",
            Nummair:"",
            Password:"",
            Bureauoff:"",
            DateOfdebut:"",
            DateOffin:"",
            PhotoFileName:"anonymous.png",
            offMat:this.getNumOfflog()
        });
    }
    editClick(off){
        let tr=this.getTravailleCurent(off.NumOff);
        this.setState({
            modalTitle:"Edit Officier",
            Matricule:off.NumOff,
            MatOFF:off.Matricule,
            OfficierNom:off.Nom,
            OfficierPreNom:off.Prenom,
            Password:off.Password,
            IDTravaille:tr.id,
            Bureauodl:this.state.Bureauoff,
            Bureauoff:tr.NumB,
            DateOfdebut:tr.Date_dub,
            DateOffin:tr.Date_Fin,
            PhotoFileName:off.photo||"anonymous.png",
            offMat:this.getNumOfflog()
        });
    }
/////////////////////////Actions in API
    createClick(){
        let currentdate=new Date()
        let month=currentdate.getMonth()+1;
        if(month<10)month="0"+month;
        let day=currentdate.getDate();
        if(day<10)day="0"+day;
        let NB=this.state.Bureauoff;
        if(NB<10)NB="0"+NB;
        let NA=(this.maxNumoff()+1);
        if(NA<10)NA="0"+NA;

        fetch(variables.API_URL+this.state.Officiertbl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Matricule:""+this.props.As+NB+NA,   
                Nom:this.state.OfficierNom,
                Prenom:this.state.OfficierPreNom,
                Password:this.state.Password,
                photo:this.state.PhotoFileName,
                Nummaire:this.state.offMat
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            fetch(variables.API_URL+this.state.Travailletbl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:this.maxidtr()+1,
                Date_dub: ""+ currentdate.getFullYear()+"-"+ month  + "-" + day,
                Date_Fin: null,
                NumOff:this.maxNumoff()+1, 
                NumB: this.state.Bureauoff 
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
    updateClick(){
        let currentdate=new Date()
        let month=currentdate.getMonth()+1;
        if(month<10)month="0"+month;
        let day=currentdate.getDate();
        if(day<10)day="0"+day;

        fetch(variables.API_URL+this.state.Officiertbl,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                NumOff: this.state.Matricule,
                Matricule: this.state.MatOFF,
                Nom: this.state.OfficierNom,
                Prenom: this.state.OfficierPreNom,
                Password: this.state.Password,
                photo:this.state.PhotoFileName,
                Nummaire:this.state.offMat
            })
        })
        .then(res=>res.json())
        .then((result)=>{
           fetch(variables.API_URL+this.state.Travailletbl,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:this.state.IDTravaille,
                Date_dub:this.state.DateOfdebut,
                Date_Fin: ""+ currentdate.getFullYear()+"-"+ month  + "-" + day,
                NumOff:this.state.Matricule,
                NumB: this.state.Bureauodl
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            fetch(variables.API_URL+this.state.Travailletbl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:this.maxidtr()+1,
                    Date_dub: ""+ currentdate.getFullYear()+"-"+ month  + "-" + day,
                    Date_Fin: null,
                    NumOff:this.state.Matricule,
                    NumB: this.state.Bureauoff 
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
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Officier/'+id,{
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
    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'Officier/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({PhotoFileName:data});
        })
    }
///////////////////////
    Passwodvision(){
       let password= document.getElementById('password1');
       if(password.type==='text')password.type = 'password';
       else password.type = 'text';
    }
    maxNumoff(){
        let max=0;
        this.refreshList();
        this.state.Officier.map(off=>{
            if(max<off.NumOff)max=off.NumOff;
        })
        return max;
    }
    maxidtr(){
        let max=0;
        this.state.Travaille.map(tr=>{
            if(max<tr.id)max=tr.id;
        })
        return max;
    }
    render(){
        const {
            Officier,
            Travaille,
            Bureau,
            BureauinCommune,
            commune,
            modalTitle,
            Matricule,
            MatOFF,
            OfficierNom,
            OfficierPreNom,
            Password,
            DateOfdebut,
            DateOffin,
            Bureauoff,
            Bureauold,
            PhotoPath,
            PhotoFileName
        }=this.state;
        return(
<div>
    <br /><br /><br /><br />
    <button type="button" className="btn btn-primary m-2 float-end" 
    data-bs-toggle="modal"data-bs-target="#OfficierForm" onClick={()=>this.addClick()}>
        Add Officier
    </button>
    <table className="table table-striped" style={{minHeight: 366}}>
    <thead>
    <tr>
        <th>
            Matricul
        </th>
        <th>
            <div className="d-flex flex-row">
                <input className="form-control m-2" onChange={this.changeOfficierPrenomFilter} placeholder="Filter"/>
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
                <input className="form-control m-2" onChange={this.changeOfficierNomFilter} placeholder="Filter"/>
                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',true)}>
                        <i className="bi-arrow-down-circle-fill"></i>
                    </button>
                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',false)}>
                        <i className="bi-arrow-up-circle-fill"></i>
                    </button>
            </div>
            Nom
        </th>
        <th></th>
    </tr>
    </thead>
    <tbody>
        {Officier.map(off=>
            <tr key={off.NumOff}>
                <td>{off.Matricule}</td>
                <td>{off.Prenom}</td>
                <td>{off.Nom}</td>
                <td>
                <button type="button" className="btn btn-light mr-1"
                data-bs-toggle="modal" data-bs-target="#OfficierForm" onClick={()=>this.editClick(off)}>
                    <i className="bi-pencil-square"></i>
                </button>

                <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(off.NumOff)}>
                    <i className="bi-trash"></i>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

    <div className="modal fade" id="OfficierForm" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ></button>
        </div>

        <div className="modal-body">
            <div className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 w-50 bd-highlight">
            {Matricule!==0?
                <div className="input-group mb-3">
                    <span className="input-group-text">Matricule</span>
                    <input type="text" className="form-control"value={MatOFF}onChange={this.changeMatricule}/>
                </div>:null}
                <div className="input-group mb-3">
                    <span className="input-group-text">Name</span>
                    <input type="text" className="form-control"value={OfficierNom}onChange={this.changeOfficierNom}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Prenom</span>
                    <input type="text" className="form-control"value={OfficierPreNom}onChange={this.changeOfficierPreNom}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Password</span>
                    <input type="password" id='password1' className="form-control"value={Password}onChange={this.changeOfficierPassword}/>
                    <i className="bi-eye m-2" onClick={this.Passwodvision}></i>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Bureau</span>
                    <select className="form-select"onChange={this.changeBureau}value={Bureauoff}required>
                        <option value=""></option>
                        {Matricule!==0? <>{Bureau.map(bur=><option key={bur.NumB} value={bur.NumB}>
                            {this.getCommune(bur.NumC)}
                        {bur.NumB+"-"+commune[bur.NumC]}
                        </option>)}</>:null}
                        {Matricule===0? <>{BureauinCommune.map(bur=><option key={bur.NumB} value={bur.NumB}>
                            {this.getCommune(bur.NumC)}
                        {bur.NumB+"-"+commune[bur.NumC]}
                        </option>)}</>:null}
                    </select>
                </div>
                {Matricule!==0?<div className="input-group mb-3">
                    <span className="input-group-text">Date début de travaille</span>
                    <input type="text"className="form-control"value={DateOfdebut} readOnly/>
                </div>:null}
            </div>
            <div className="p-2 w-50 bd-highlight">
                <img width="250px" height="250px" src={PhotoPath+PhotoFileName} alt=""/>
                <input className="m-2" type="file" onChange={this.imageUpload}/>
            </div>
            </div>

            {Matricule===0?
                <button type="button"className="btn btn-primary float-start" onClick={()=>this.createClick()}>Create</button>
                :null}

            {Matricule!==0?
                <button type="button" className="btn btn-primary float-start"onClick={()=>this.updateClick()}>Update</button>
                :null}
        </div>

        </div>
        </div> 
    </div>


</div>
        )
    }
}