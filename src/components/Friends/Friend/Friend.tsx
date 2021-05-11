import React from 'react';
import classes from './../Friends.module.css';
import { NavLink } from 'react-router-dom';


type PropsType = {
    name: string
    image: string
}

const Friend:React.FC<PropsType> = (props) => {
    return (

        <div className={classes.friend}>
            <img src={`./img/${props.image}`} alt={props.image}></img>
            <NavLink activeClassName={classes.active} to={`/dialogs/${props.name}`}>
                {props.name}
            </NavLink>
        </div>
    )        
}

export default Friend;