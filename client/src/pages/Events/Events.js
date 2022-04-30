import React, { useState, useEffect } from 'react';
import Login from '../Login/Login';
import './Events.css';
import Axios from 'axios';
import { useHistory, Redirect } from "react-router-dom";
import CriarNavBar from '../navbar/navbar';
function Events() {
    const [eventos, setEventos] = useState([])
    let history = useHistory();

    const [id_evento, setEventosCandidatos] = useState([])
    const [searchEvento, setSearchEvento] = useState('')

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            let user = JSON.parse(localStorage.getItem('user-info'))
            const tipoDoc = user.result[0].tipoDocumento;

            Axios.get(`http://localhost:3001/eventos/${tipoDoc}`).then((response) => {
                setEventos(response.data/*.data serve para mostrar apenas o array*/);
            })
            Axios.get('http://localhost:3001/candidatoseventos').then((response) => {
                setEventosCandidatos(response.data/*.data serve para mostrar apenas o array*/);
            })
        }
        else {
            history.push('/')

        }
    }, [])
 
    return (


        <div className="TodosOsEventos">
            <CriarNavBar />

            <input className="procurarEvento" type="text" placeholder="Pesquisar evento.." onChange={event => { setSearchEvento(event.target.value) }} />

            {eventos.filter((val) => {
                if (searchEvento == "") {
                    return val
                } else if (val.titulo.toLowerCase().includes(searchEvento.toLocaleLowerCase())) {
                    return val
                }
            }).map((val, key) => {

                return <div className="col-md-12 col-sm-12">
                    <div className="card-body">
                        <h5 className="card-title">Titulo: {val.titulo}</h5>
                        <p className="card-text">Descrição: {val.descricao}</p>
                        <h6 className="card-subtitle mb-2 text-muted">Data de expiração: {val.dataFim}</h6>
                        <button onClick={() => {
                            history.push(`/eventos/${val.id}`);
                        }} type="button" className="fas fa-vote-yea btn btn-disponible" data-toggle="modal" data-target="#voteModal">
                            Ver Candidatos
                        </button>
                    </div>
                </div>;
            })}

        </div >
    );
}


export default Events
