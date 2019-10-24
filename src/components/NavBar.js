import React, {useContext} from 'react';
import { Link, NavLink } from 'react-router-dom';
import beigeLogo from "./logo_beige.png";
import { LoginContext } from '../contexts/LoginContext';

const NavBar = (props) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
    return (
    
        <div className="nav-bar">
            <Link to="/"><img src={beigeLogo} className="nav-logo" /></Link>
            {!isLoggedIn 
            ? <NavLink to='/login' activeClassName="active-link">Login</NavLink> : null}
            {!isLoggedIn 
            ? <NavLink to='/signup' activeClassName="active-link">Signup</NavLink> : null}
            {isLoggedIn 
            ? <NavLink to='/' onClick={ _ => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setIsLoggedIn(false) 
            }}>Logout</NavLink> : null}
            <NavLink to='/map' activeClassName="active-link">Map</NavLink>
            <NavLink to='/profile' onClick={ _ => {
                setIsLoggedIn(localStorage.getItem("token") ? true : false); 
            }}
            
            activeClassName="active-link">My Stories</NavLink>

            <NavLink to="/location">
                Location
            </NavLink>
            
        </div>
)};

export default NavBar;

