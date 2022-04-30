

/*************************************************COTAÇOES DOS VOTOS DOS EVENTOS EXPIRADOS***************************************************/




import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import './EventosCotacoes.css';
import CriarNavBar from '../navbar/navbar';
function EventosPost() {
    let history = useHistory();
    const [candidato, setCandidatos] = useState([]);
    const[ searchCandidato, setSearchCandidato]= useState('')
    let { id } = useParams();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            axios.get(`http://localhost:3001/resultados/${id}`).then((response) => {
            setCandidatos(response.data)
            })
        } else{
            history.push('/')
        }
    }, [id]);

    return (
        <div className="voto">
            <CriarNavBar />
            <div className="botaoParaCentrar">
                <input className="procurarCandidatoCotacoes" type="text" placeholder="Pesquisar nome do candidato.." onChange={event =>{setSearchCandidato(event.target.value)}}/>
                <h1>Votações:</h1>
                {candidato.filter((val)=>{
                if (searchCandidato == ""){
                    return val
                } else if (val.nome.toLowerCase().includes(searchCandidato.toLocaleLowerCase())){
                    return val
                }
            }).map((val) => {
                    return (
                        <div className="centrar">
                            <div className="card-body-Centrado">
                                <h7 className="card-title33">
                                    Candidato: {val.nome}
                                </h7 >
                                <h7 className="card-title33">Número de votos: {val.votosContagem}</h7>

                            </div>
                        </div>)
                })}
                <button className="btn ee" onClick={() => { history.push('/eventosexpirados') }}>Voltar</button>

            </div>
        </div>
    );
}

export default EventosPost
