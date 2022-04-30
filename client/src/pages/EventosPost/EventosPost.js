

/**************************************************VOTAÇOES NOS ATUAIS *************************************************/

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import './EventosPost.css';
import CriarNavBar from '../navbar/navbar';
function EventosPost() {
    let idcandidato = 0;
    let history = useHistory();
    let { id } = useParams();
    const [candidato, setCandidatos] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('user-info')) {

            axios.get(`http://localhost:3001/candidatoseventos/${id}`).then((response) => {
                setCandidatos(response.data)

            })
        } else {
            history.push('/');
        }
    }, [id]);
    function enviaridcandidato(idcanditoTARGETING) {
        idcandidato = idcanditoTARGETING.target.value
    }
    function enviarTodosParametros() {
        let user = JSON.parse(localStorage.getItem('user-info'))
        const id_user = user.result[0].id;
        const idevento = id;
        const idcandidatoCONST = idcandidato;
        axios.post("http://localhost:3001/votoefetuado/", { id_utilizador: id_user, id_evento: idevento, id_candidato: idcandidatoCONST }).then((response)=>{
            if(response.data.message == "votofechado"){
                alert("Já tinha votado neste evento.")
                history.push("/eventos");
                
            }
            if(response.data.message == "votoaberto"){
                alert("Voto efetuado!");
                history.push("/eventos");
            }
            
            
        })
        
    }
    return (
        <div className="voto">
            <CriarNavBar />
            <div className="botaoParaCentrar">
                <h1>Qual candidato irá escolher?</h1>
                {candidato.map((val) => {
                    return (
                        <div className="centrar">
                            <div className="card-body-Centrado">
                                <h5 className="card-title33">
                                    Nome: {val.nome}
                                </h5 >
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" onChange={enviaridcandidato.bind(this)} value={val.id} />
                                <h5 className="card-title34">Descrição: {val.descricao}</h5 >
                            </div>
                        </div>)

                })}
                <button onClick={enviarTodosParametros} type="submit" className="fas fa-vote-yea ee" data-toggle="modal" data-target="#voteModal">
                    Votar
                </button>
            </div>
        </div>
    );
}

export default EventosPost
