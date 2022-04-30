
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import './Login.css';

export default function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const [verificacao, setVerificacao] = useState(true);
    Axios.defaults.withCredentials = true;


    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push("/eventos")
        }
    }, [])



    async function login() {

        let item = { email, password };
        let result = await fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'

            },
            body: JSON.stringify(item)

        })
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
        history.push("/eventos")


    }




    return (
        
        <div className="LoginTotal">
            
            <div className="login">
                <h1 className="titulo">Voto Eletrónico</h1>
                <div className="borderLogin">

                    <h2>Login:</h2>
                    <input
                        type="email" placeholder="email..."
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}

                    />
                    <input
                        type="password"
                        placeholder="password..."
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button onClick={login}>Login</button>
                    <div className="statuslogin ">{loginStatus}</div>
                    <div className="login-msg-erro text-center">
                        {verificacao == false && <span><strong>Dados Inseridos Inválidos</strong></span>}
                    </div>
                </div>
            </div>
        </div>)




}
