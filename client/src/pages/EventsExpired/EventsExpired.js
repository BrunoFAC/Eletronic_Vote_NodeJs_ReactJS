import CriarNavBar from '../navbar/navbar'
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './EventsExpired.css'
import { useHistory } from "react-router-dom";

function EventsExpired() {
    const [eventosExp, setEventosExp] = useState([])
    const[ searchEventoExpired, setSearchEventoExpired]= useState('')
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            Axios.get("http://localhost:3001/eventosexpirados").then((response) => {
                setEventosExp(response.data/*.data serve para mostrar apenas o array*/);
            })
        } else {
            history.push('/')
        }
    }, []/*PARA CHAMAR APENAS UMA VEZ*/)



    return (
        <div>
            <div className="TodosOsEventos">
                <CriarNavBar />
                <input className="procurarEventoExpirado" type="text" placeholder="Pesquisar evento expirado.." onChange={event =>{setSearchEventoExpired(event.target.value)}}/>
                {eventosExp.filter((val)=>{
                if (searchEventoExpired == ""){
                    return val
                } else if (val.titulo.toLowerCase().includes(searchEventoExpired.toLocaleLowerCase())){
                    return val
                }
            }).map((val) => {

                    return <div className="col-md-12 col-sm-12">
                        <div className="card-body">
                            <h5 className="card-title">Titulo: {val.titulo}</h5>
                            <p className="card-text">Descrição: {val.descricao}</p>
                            <p className="card-subtitle mb-2 text-muted">Data de expiração: {val.dataFim}</p>
                            <p className="card-title mb-2 text-muted">Total de votos: {val.max_voto}</p>
                            <button className="btn" onClick={() => { history.push(`/resultados/${val.id}`) }}>Resultado</button>
                        </div>
                    </div>;
                })}

            </div >
            );

        </div>
    )
}

export default EventsExpired
