import React from 'react';
import classes from './Post.module.css'

type PropsType = {
    message: string
    likesCount: number
    id: number
}

const Post:React.FC<PropsType>  = (props) => {
    return (
        <div className={classes.item}>

            <img src='./img/ava.jpg'></img>
            {props.message}
            <div>
                <span>like {props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post;