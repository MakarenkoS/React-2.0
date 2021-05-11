import React from 'react';
import classes from './Friends.module.css';
import Friend from './Friend/Friend';
import { FriendsDataType } from '../../types/types';

type PropsType = {
    friendsData: Array<FriendsDataType>
}

const Friends:React.FC<PropsType> = (props) => {

    let friendsElements = props.friendsData.map
        ((f) => <li key={f.id}> <Friend name = {f.name} image = {f.image} key={f.id}/></li>)
   
    return (
        <div className={classes.friends}>
            <ul className={classes.friends_list}>
                {friendsElements}
            </ul>
        </div>
    )
}

export default Friends;