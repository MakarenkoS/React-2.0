import React from 'react';
import classes from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    let path = `/dialogs/${props.id}`;
    return (
        <li className={`${classes.dialog} ${classes.active}`}>
            <NavLink to={path} key={props.id}> {props.name} </NavLink>
        </li>
    )
}


export default DialogItem;