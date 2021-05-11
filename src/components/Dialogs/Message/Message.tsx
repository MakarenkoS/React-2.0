import React from 'react';
import classes from './../Dialogs.module.css';

type PropsType = {
    id: number
    sender: string
    message: string
}

const Message:React.FC<PropsType>= (props) => {
    return (
        <li className={classes.dialogs_item}>          
            <span className={classes.message_id} key={props.id}> {props.sender} </span>
            <span className={classes.message} key={props.id} >{props.message} </span>
        </li>
    )
}

export default Message;