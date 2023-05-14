export function HomeApp({offlog,log}){

    return (
        <div>

<br></br><br></br><br></br><br></br><br></br>
        {log==0?<div className="container">
        <h1 className="text-md-center">Welcome To Our Services</h1>
        </div>:null}
        {log!=0?<div className="container">
        <h1 className="text-md-center">Welcome Mr <span className="text-muted">{offlog.Nom+" "+offlog.Prenom}</span> </h1>
        </div>:null}
           
<br></br><br></br>
    <section class="m-70 p-10">
            
            <div class="container">
                <div class="row text-center g-4">
                    <div class="col-md">
                       <div class="card bg-dark text-light">
                        <div class="card-body text-center">
                            <div class="h1 mb-3">
                            <i class="bi bi-person-plus"></i>
                            </div>
                            <h3 class="card-title">
                            certificat de Naissance
                            </h3>
                            <p class="card-text lead">
                            Un certificat de naissance est un document légal qui sert de preuve de l'identité et de l'âge d'une personne.<br/>Il est généralement délivré par l'organisme gouvernemental responsable des registres d'état civil dans la région où la personne est née...
                            </p>
                            <a href="#naissance" class="btn btn-primary">Read More</a>
                            
                        </div>

                       </div> 
                    </div>
                    <div class="col-md">
                        <div class="card bg-secondary text-light">
                            <div class="card-body text-center">
                                <div class="h1 mb-3">
                                <i class="bi bi-people"></i>
                                </div>
                                <h3 class="card-title ">
                                certificat de Mariage
                                </h3>
                                <p class="card-text lead">
                                Un certificat de décès est un document légal qui sert de preuve du décès d'une personne.<br/> Il est généralement délivré par l'organisme gouvernemental responsable des registres d'état civil dans la région où la personne est décédée...
                                </p>
                                <a href="#mariage" class="btn btn-dark">Read More</a>
                                
                            </div>
    
                           </div>
                    </div>
                    <div class="col-md">
                        <div class="card bg-dark text-light">
                            <div class="card-body text-center">
                                <div class="h1 mb-3">
                                <i class="bi-person-x"></i>
                                </div>
                                <h3 class="card-title">
                                certificat de  Deces
                                </h3>
                                <p class="card-text lead">
                                Un certificat de mariage est un document légal qui sert de preuve du mariage d'un couple. <br/>Il est généralement délivré par l'organisme gouvernemental responsable des registres d'état civil dans la région où le mariage a eu lieu...
                                </p>
                                <a href="#deces" class="btn btn-primary">Read More</a>
                                
                            </div>
    
                           </div>
                    </div>

                </div>
            </div>
            <br></br>
            <section id="naissance" class="p-5 bg-dark text-light">
            <div class="container">
                <div class="row align-items-center justify-content-between">
                    <div class="col-md">
                    <img src="icon-naissance.svg" class="img-fluid w-100" alt=""></img>
                    
                    
                    </div>
                    <div class="col-md p-5">
                    <h2>About Naissance</h2>
				        <p class="lead">Pour obtenir un certificat de naissance, vous devrez généralement fournir une preuve d'identité, une preuve de relation avec la personne indiquée sur le certificat et des frais. Vous devrez peut-être également fournir des documents supplémentaires, tels qu'un passeport ou un permis de conduire, en fonction des exigences spécifiques de l'organisme émetteur.</p>
                        <p class="lead">
                        La naissance de l’enfant est déclarée par le père ou la mère ou par les docteurs en médecine, les sages femmes ou autres personnes qui ont assisté à l’accouchement.
                        </p>
                        <p class="lead">
                        Le déclarant doit présenter le livret de famille, et le cas échéant, les actes de naissance du père et de la mère et l’acte de leur mariage.
                        </p>
                        
                        <a href="#" class="btn btn-secondary mt-3">
                            <i class="bi bi-chevron-right"></i> back
                        </a>
                        
                    </div>
                </div>
            </div>
        </section>
        <section id="mariage" class="p-5  text-dark">
            <div class="container">
                <div class="row align-items-center justify-content-between">
                
                    <div class="col-md ">
                        <h2>About Mariage</h2>
				        <p class="lead">Pour obtenir un certificat de décès, vous devrez généralement fournir une preuve de parenté avec la personne indiquée sur le certificat, comme un certificat de mariage ou une preuve de tutelle légale. Vous devrez peut-être également fournir des frais et des documents supplémentaires tels qu'un certificat de décès de l'hôpital. </p>
                        <p class="lead">
                        L’un et l’autre, des futurs époux doivent justifier de leur état civil par la production de l’un des documents suivants :</p>
                        <p class="lead">1-Extrait datant de moins de trois (3) mois, soit de l’acte de naissance, soit de la transcription du jugement individuel ou collectif de naissance.</p>
                        <p class="lead">2-fiche de résidence de l’un des époux.</p>
                        <p class="lead">3-Certificat médical des deux époux.</p>
                        <p class="lead">4-Les deux témoins doivent présenter leurs carte nationale d’identité ou n’importe quel document prouvant les identifiés.</p>
                        
                        <a href="#" class="btn btn-secondary mt-3">
                            <i class="bi bi-chevron-right"></i> back
                        </a>
                    </div>
                    <div class="col-md">
                    <img src="mariage.svg" class="img-fluid w-100" alt=""></img>
                    </div>
                </div>
            </div>
        </section>
        <section id="deces" class="bg-dark text-light">
            <div class="container">
                <div class="row align-items-center justify-content-between">
                    <div class="col-md">
                    <img src="Declaration-de-deces.svg" class="img-fluid w-100" alt=""></img>
                    </div>
                    <div class="col-md p-5">
                        <h2>About Deces</h2>
				        <p class="lead">Pour obtenir un certificat de mariage, vous devrez généralement fournir une preuve d'identité et une preuve du mariage, telle qu'une licence de mariage. Vous devrez peut-être également fournir des frais et des documents supplémentaires tels qu'un certificat de divorce si vous avez déjà été marié. </p>
                        <p class="lead">
                        La déclaration de décès se fait par l'un des personnes suivantes :</p>
                        <p class="lead">1-Personne possédant sur son état civil les renseignements les plus exacts et les plus complets possibles.</p>
                        <p class="lead">2-Les hôpitaux ou les structures de santé ou les hôpitaux maritimes.</p>
                        <p class="lead">3-Les responsables des établissements pénitentiaires, …Etc.;</p>
                        <p class="lead">4-Les déclarations de décès doivent être faites dans un délai de vingt quatre (24) heures à compter du décès.</p>
                        <p class="lead">Pour les habitants des wilayas du sud, la déclaration du décès est de vingt (20) jours.</p>
                        <a href="#" class="btn btn-secondary mt-3">
                            <i class="bi bi-chevron-right"></i> back
                        </a>
                    </div>
                </div>
            </div>
        </section>
        </section>
        </div>
        
        
        )
}


