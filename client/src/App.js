import './App.css';
import Login from './pages/Login/Login';
import React from "react";
import Events from './pages/Events/Events';
import EventsExpired from './pages/EventsExpired/EventsExpired';
import EventosPost from './pages/EventosPost/EventosPost';
import Perfil from './pages/perfil/Perfil';
import EventosCotacoes from './pages/EventosCotacoes/EventosCotacoes';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



function App() {

  return (

    <Router>
      <Switch>
        <Route exact path="/" exact component={(props) => <Login />} />
        <Route exact path="/eventos" exact component={ (props) => <Events  />} />
        <Route exact path="/eventosexpirados" exact component={ (props) => <EventsExpired  />} />
        <Route exact path="/eventos/:id" exact component={ (props) => <EventosPost/>} />
        <Route exact path="/perfil" exact component={(props)=><Perfil/>}/>
        <Route exact path="/resultados/:id" exact component={ (props) =><EventosCotacoes/>}/>
      </Switch>
    </Router>

  );
}

export default App;
