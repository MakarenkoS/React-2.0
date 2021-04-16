import React from 'react';
import classes from './Post.module.css'

const Post = (props) => {
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