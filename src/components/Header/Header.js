import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
 
    return <header className={classes.header}>
        <img src='./../img/logo.png'></img>
        
        <div className={classes.loginBlock}>
            {props.isAuth ? <div> {props.login} {props.userId} <button onClick = {props.authLogout}> Logout </button> </div>
            : <NavLink to={'/login'}>Login </NavLink>}
        </div>

    </header>
}

    export default Header; 
