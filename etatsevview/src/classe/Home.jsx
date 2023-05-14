import React,{Component} from 'react';
import {variables} from '../Variables.js';
import {Officier} from './Officier';
import {Agent} from './Agent';
import {Personne} from './Personne';
import {Action} from './Action';
import {Action_I} from './Action_I';
import {Statistique} from './Statistique';
import {Profileoff} from './profileoff';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import {HomeApp} from './HomeApp';

export class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            officier:[],
            Travaille:[],/////////////////+-+-
            Commune:[],
            offlog:"",
            Communeoff:0,/////////////////+-+-
            Matricule:"",
            Password:"",
            log:0,
            as:"",

            Officiertbl:"",
            Communetbl:'Commune',

            PhotoPath:variables.PHOTO_URL
        }
    }
    changePassword = (e)=>{
        this.setState({Password:e.target.value});
    }
    changeMatricule = (e)=>{
        this.setState({Matricule:e.target.value});
    }
    Passwodvision(){
        let password= document.getElementById('password');
        if(password.type==='text')password.type = 'password';
        else password.type = 'text';
    }
    verfie(){
        if(this.state.Matricule[0]==='N')this.state.Officiertbl='Officier';
        else this.state.Officiertbl='Agent_Consulat';
        if(this.state.Officiertbl!=""){
        fetch(variables.API_URL+this.state.Officiertbl)
        .then(response=>response.json())
        .then(data=>{
            this.state.officier=data;

    let passwordFild=document.getElementById("msg_password");
    let Matfild=document.getElementById("msg_Mat");
    passwordFild.innerHTML="";
    Matfild.innerHTML="Officier non trouver"
        this.state.officier.forEach(off=>{
            if(off.Matricule===this.state.Matricule){
              Matfild.innerHTML="";
                if(off.Password===this.state.Password){
                    if(off.NumOff===off.Nummaire) this.setState({log:2});
                    else this.setState({log:1});
                    this.state.as=off.Matricule[0];
                    this.getinfolog();
                }else  passwordFild.innerHTML="Password incorect";                   
            }
        })
        });
      }
    }
    getinfolog(){
      let MAT=this.state.Matricule;
      this.state.offlog=this.state.officier.filter(function(el){
        if (el.Matricule==MAT)return el;
      })
      ////////////////+-+-
      this.setCookie("MAT",MAT,1); //////set cookies
      this.setCookie("PassWord",this.state.Password,1);

      let NumOff=this.state.offlog[0].NumOff;
      if(this.state.as=="N"){
      fetch(variables.API_URL+this.state.Communetbl)
      .then(response=>response.json())
      .then(data=>{
          this.state.Commune=data;

          let C= this.state.Commune.filter(function(el){
            if(el.NumMaire==NumOff) return el;
        });
        this.setState({Communeoff:C[0].id});
      });
    }else this.state.Communeoff=-1;
    /////////////////////////////////
    }
    Connect=()=>{
      this.setState({
        Matricule:this.getCookie("MAT"),
        Password:this.getCookie("PassWord")
      })
    }
    disconnect(){
      this.setState({log:0});
      this.setState({as:""});
    }
    ///////////////////////// Cookies
    setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
////////////////////////////    
    render(){
        const {
            offlog,
            Communeoff,
            Matricule,
            Password,
            log,
            as,
            PhotoPath
        }=this.state;
        return(
<div style={{    background: "#fffafa"}}>
<BrowserRouter>
<div className="">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
            <div className="container">
                <a href="#" className="navbar-brand">Etat Civil</a>
                
                <button className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navmenu"
                >
                
                <span className="navbar-toggler-icon"> </span>
                 </button>
                 
                <div className="collapse navbar-collapse"id="navmenu">
                    <ul className="navbar-nav ms-auto" >
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                    </ul>
                    {log>=1? <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Personne">Personne</NavLink>
                        </li>
                    </ul>:null}
                    {log===2&&as=='N'?<ul className="navbar-nav">
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/Officier">Officier</NavLink>
                        </li>
                    </ul>:null}
                    {log===2&&as=='I'?<ul className="navbar-nav">
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/Agent">Officier</NavLink>
                        </li>
                    </ul>:null}
                    {log>=1?<ul className="navbar-nav">
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/Action">Action</NavLink>
                        </li>
                    </ul>:null}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/Statistique">Statistique</NavLink>
                        </li>
                    </ul>

                    {log===0?<ul className="navbar-nav">
                     <button type="button" className="btn btn-dark m-2 float-end" 
                        data-bs-toggle="modal"data-bs-target="#loginForm" onClick={this.Connect}>   Login  </button></ul>
                    :null}
                        {log!==0?<><details><summary>
                            <img className='rounded-circle' height="30px" weight="30px" src={PhotoPath + offlog[0].photo} alt="" />
                        </summary>
                        {offlog.length==1?
                        <div className="position-fixed bg-light p-2 rounded shadow-sm"style={{transform: 'translate(-47px,14px)'}}>
                            <div className="p-2 bd-highlight">
                            <div className="col-xs-1 m-2" align="center"style={{width: 151,height: 84,position: "absolute",background: "#4bcba7",transform: "translate(-23px, -24px)",zIndex: -1,    borderRadius: "4px 4px 0px 0px"}}> 
                            <h6>{offlog[0].Nom+" "+offlog[0].Prenom}</h6>
                                </div>
                            <div className='rounded-circle bg-secondary mt-3 col-xs-1'align="center">
                                <img className='rounded-circle' width="120px" height="120px" src={PhotoPath+offlog[0].photo} alt=""/>
                                </div>                                
                                <div className="col-xs-1 m-2" align="center">
                                <h6>{Matricule}</h6>
                                </div>
                                <button type="button" className="btn btn-primary float-start"data-bs-dismiss="modal" aria-label="Close"onClick={()=>this.disconnect()}><i class="fa-solid fa-right-from-bracket"></i></button>
                            </div>
                        </div>:null}</details>
                    </>:null}
         </div>
         </div>  
        </nav>
     
      <Routes>
        <Route path='/' element={<HomeApp offlog={offlog[0]} log={log}/>}/>
        {log==2&&as=='N'?<Route path='/Officier' element={<Officier Matricule={Matricule} As={as}/>}/>:null}
        {log==2&&as=='I'?<Route path='/Agent' element={<Agent Matricule={Matricule} As={as}/>}/>:null}
        {log>=1?<Route path='/Personne' element={<Personne offlog={offlog} Communeoff={Communeoff}/>}/>:null}
        {log>=1&&as=='N'?<Route path='/Action' element={<Action offlog={offlog} Communeoff={Communeoff}/>}/>:null}
        {log>=1&&as=='I'?<Route path='/Action' element={<Action_I offlog={offlog} Communeoff={Communeoff}/>}/>:null}
          <Route path='/Statistique' element={<Statistique/>}/>
        {log>=1?<Route path='/profile' element={<Profileoff/>}/>:null}
      </Routes>
    </div>
    </BrowserRouter>
                     
    <footer class="p-5 bg-light text-center text-dark position-relative">
            <div class="container">
                <p class="lead">Copyright &copy; 2023 Nekache Belkacemi</p>
                <a href="#" class="position-absolute bottom-0 end-0 p-5">
                    <i class="bi bi-arrow-up-circle h1"></i>
                </a>
            </div>
        </footer> 
    <div className="modal fade" id="loginForm" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-sm modal-dialog-centered">
  <div className="modal-content">
    <div className="modal-body">
          <div id="brandLogoOuter">
            <div id="brandLogoInner">
            <button type="button"data-bs-dismiss="modal" aria-label="Close"><i className="bi-box-arrow-in-right"></i>
          </button>
            </div>
          </div>
          <form action="#">
            <div className="input-group my-3">
              <div className="input-group mb-3">
                    <span className="input-group-text">Matricule</span>
                    <input type="text" className="form-control"value={Matricule}onChange={this.changeMatricule}/>
                    <div id='msg_Mat'className='text-danger m-2'></div>
                </div>
              </div>
            <div className="input-group my-3">
            <div className="input-group mb-3">
                    <span className="input-group-text">Password</span>
                    <input type="password" id='password' className="form-control"value={Password}onChange={this.changePassword}/>
                    <i className="bi-eye m-2" onClick={this.Passwodvision}></i>
                </div>
                <div id='msg_password'className='text-danger m-2'></div>
            </div>
            <div className="mt-3 text-center">
              <input type="checkbox" className="me-2" /> Remember me
            </div>
            <div id="btnHolder">
            <button type="button" className="btn btn-lg btn-dark text-white mt-3 w-100"onClick={()=>this.verfie()}>login</button>
            </div>
          </form>
    </div>
  </div>
  </div>
  </div>

</div>
        )
    }
}