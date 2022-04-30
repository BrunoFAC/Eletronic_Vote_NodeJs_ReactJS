
import React from 'react';
import './navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
function CriarNavBar() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const history = useHistory();
    function logOut(){
        localStorage.clear();
        history.push('/');
    }
    function ChangePassword(){
        history.push('/perfil');
    }
    
    return (
        <div>
            <Navbar className="py-3 tema" bg="dark" variant="dark">
                
                <Nav className="eue">
                    {
                        localStorage.getItem('user-info') ?
                            <>
                            <div className="links">
                                <Link to="/eventos">Eventos</Link>
                                <Link to="/eventosexpirados">Eventos expirados</Link>
                                </div>
                            </>
                            : 
                            <>
                            <div className="linksafterlogout">
                                <Link to="/">Login</Link>
                                </div>
                            </>
                    }
                </Nav>
                {localStorage.getItem('user-info') ?
                <Nav className="ee">
                    <div className="nomeELogout">
                    <NavDropdown  title={user.result[0].nome}>
                        <NavDropdown.Item className="item-Nav" onClick={ChangePassword}>Perfil</NavDropdown.Item>
                        <NavDropdown.Item className="item-Nav2" onClick={logOut}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </div>
                </Nav>
                : history.push('/')
}
            </Navbar>
        </div >


    )
}

export default CriarNavBar
