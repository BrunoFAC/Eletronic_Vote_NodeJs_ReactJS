import React, { useState, useEffect } from 'react';
import Login from '../Login/Login';
import VerificacaoPassword from './VerificacaoPassword';
import Axios from 'axios';
import { useHistory, Redirect } from "react-router-dom";
import CriarNavBar from '../navbar/navbar';
function Perfil() {
    let history = useHistory();
    const [password, setNovaPassword] = useState('')
    const [passwordAntiga, setPasswordAntiga] = useState('')

    const alterarPW = () => {
        let user = JSON.parse(localStorage.getItem('user-info'))
        const idUtilizador = user.result[0].id;
        Axios.post(`http://localhost:3001/novapassword/${idUtilizador}`, { password: password })

    }
    function voltarParaEvento() {
        history.push('/eventos');
        alert("Password mudada com sucesso!")
    }

    return (


        <div className="TodosOsEventos">
            <CriarNavBar />
            <div className="col-md-12 col-sm-12">
                <h1>Alterar Password</h1>
                <div className="card-body">
                    <input type="password" placeholder="Nova password" onChange={(event) => { setNovaPassword(event.target.value) }} className="card-text"></input>
                    <button className="btn" onClick={alterarPW} onClick={voltarParaEvento}>Nova Password</button>
                    <VerificacaoPassword password={password}></VerificacaoPassword>
                </div>
            </div>;


        </div >
    );
}


export default Perfil
