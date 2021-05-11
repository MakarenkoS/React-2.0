import React from 'react'
import classes from './Users.module.css';
import userPhoto from './../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { UsersType } from '../../types/types';


type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}


export const User: React.FC<PropsType>  = ({ unfollow, follow, followingInProgress, user}) => {

   
    return (
        <div>
            <NavLink to={'/profile/' + user.id}>
                <div>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto
                    } alt={user.photoUrl} className={classes.photo} />
                </div>
            </NavLink>
            <div>

                {
                   user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id);
                        }}
                        >Unfollow</button>

                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id);
                        }}
                        >Follow</button>}
            </div>

            <p> {user.name} </p>
            <div>
                <p> {'u.location.city'} </p>
                <p> {'u.location.country'} </p>
            </div>

            <span>{user.status}</span>

            <span>{user.followed ? ' true' : ' false'}</span>
        </div>
    )
}