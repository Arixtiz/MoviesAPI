import { Modal} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { APIurlImage } from "../services/apirest";
import axios from "axios";
import "../assetss/css/MovieCard.css";
//import Actor from "../components/actor";
import logo from "../assetss/img/no-profile-picture-icon.png";

const API_IMG = APIurlImage;
const MovieCard = ({id,title, poster_path, vote_average,release_date, overview, vote_count}) => {
    const [show,setShow] = useState(false);
    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);
    const [casting,setCasting] = useState([]);
    const fetchCast = async (id) => { 
        const {data: {cast}} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            params: {
                api_key: 'cb884ce9e20e0c70613da1c3bf1037a3',
                language: 'es-ES',
            }
        }) 
        setCasting(cast);
    }

    useEffect( () => {
       fetchCast(id);
    }, [])
   
    return(
        <div className="card text-center bg-dark mb-3">
            <div className="card-body">
                <img className="card-img-top" src={API_IMG+poster_path} />
                <div className="card-body">
                    <p>{title}</p>
                    <button className="btn btn-secondary btn-block" onClick={handleShow}>Más información</button>
                     <Modal show={show} onHide={handleClose} scrollable>
                        <Modal.Header closeButton>
                            <Modal.Title> {title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="card-img-top" src={API_IMG+poster_path} />
                            <br/>
                            <br/>
                            <h6>Fecha de lanzamiento: {release_date}</h6>
                            <h6>☆ {vote_average} - Votos: {vote_count}</h6>
                            <br></br>
                            <h6>Descripción</h6>
                            <label>{overview}</label>
                            <br/>
                            <br></br>
                            <h6>Elenco:</h6>
                           
                        
                                <div class="container">
                                    <div class="row">
                                        {casting.map((actor)=>(
                                        <div class="container card-personalizada">
                                            <div className="row">
                                            <div className="col-md-4 order-first">
                                                {actor.profile_path ? (<img type="button" width="52" height="62" src={API_IMG+actor.profile_path}/>):(<img type="button" width="52" height="62" src={logo}/>)}      
                                            </div>
                                            <div className="card-body col-md-1">
                                                <p class="card-title">{actor.name}</p>
                                                <p class="card-text">Como: {actor.character}</p>
                                                <p class="card-text">Popularidad: {actor.popularity}</p>
                                            </div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </div>  
                                
                            
                            
                            <div className="grid">
                            </div> 
                        </Modal.Body>
                     </Modal>
                </div>
            </div>
        </div>
    )
};

export default MovieCard;