import React from 'react';
import classes from './Users.module.css';
import userPhoto from './../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';



let Users = (props) => {

    return (
        <div>
            <Paginator onPageChanged = {props.onPageChanged} totalItemsCount = {props.totalUsersCount} pageSize = {props.pageSize}
                        currentPage = {props.currentPage} portionSize = {15}/>
        
            {props.users.map(u => {
                return <div>
                    <NavLink to={'/profile/' + u.id}>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto
                            } alt={u.photoUrl} className={classes.photo} />
                        </div>
                    </NavLink>
                    <div>
                            
                        {
                        u.followed ?
                            <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id);
                            }}
                            >Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id);
                            }}
                            >Follow</button>}
                    </div>

                    <p> {u.name} </p>
                    <div>
                        <p> {'u.location.city'} </p>
                        <p> {'u.location.country'} </p>
                    </div>

                    <span>{u.status}</span>

                    <span>{u.followed ? ' true' : ' false'}</span>
                </div>
            })
            }


        </div>
    )

}

export default Users;