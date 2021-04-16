import React from 'react';
import classes from './Friends.module.css';
import Friend from './Friend/Friend';

const Friends = (props) => {

    let friendsElements = props.friendsData.map
        ((f) => <li> <Friend name = {f.name} image = {f.image} key={f.id}/></li>)
   
    return (
        <div className={classes.friends}>
            <ul className={classes.friends_list}>
                {friendsElements}
            </ul>
        </div>
    )
}

export default Friends;