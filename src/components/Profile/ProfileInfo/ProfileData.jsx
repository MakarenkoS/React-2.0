import React from 'react';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileStatus from './ProfileStatus';

const ProfileData = (props) => {
    return <div className={classes.info}>
            <div>
                <p>
                    <b>Status:</b>
                    <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
                </p>

                <p>
                    <b> Обо мне:</b>
                    <p>{props.profile.aboutMe} </p>
                </p>

                <p> Имя: <span>{props.profile.fullName}</span></p>
            </div>

            <div className={classes.jobLooking}>
                <span> Ищу работу:  </span>
                {props.profile.lookingForAJob ?
                    <span className={classes.jobTrue}>Да</span> :
                    <span className={classes.jobFalse}>Нет</span>}
                <p> Профессиональные навыки: </p>
                {props.profile.lookingForAJobDescription}
            </div>


            <div>
                <ul className={classes.contacts}>
                    <Contacts contacts={props.profile.contacts} />
                </ul>
            </div>
            {props.isOwner && <button onClick={props.setProfileEditMode}> Edit Profile</button>} 
        </div>
}

const Contacts = (props) => {
    return (<>

        {Object.entries(props.contacts).map(([key, value]) => {
            return <li key={key}> <b>{key}</b> : {value} </li>
        })
        }
    </>
    )
}

export default ProfileData