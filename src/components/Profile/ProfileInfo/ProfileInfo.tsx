import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css'

import userPhoto from './../../../assets/images/user.png';
import ProfileData from './ProfileData';

import { ProfileType } from '../../../types/types';
import ProfileDataFormReduxForm from './ProfileDataFormReduxForm';


    
type PropsType = {
    status: string
    profile: null | ProfileType
    isOwner: boolean
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    updateProfile: (profile: ProfileType) => Promise<any>
}


const ProfileInfo:React.FC<PropsType>= (props) => {
    let [isUpdate, setIsUpdate] = useState(false);


    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files &&  e.target.files.length > 0) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onProfileUpdate = (formData: ProfileType) => {
        props.updateProfile(formData).then(
            () => {
                setIsUpdate(false)
            }
        )
        .catch(()=>{})
    }

    return (
        <div>
            <img className={classes.header} src='./../img/background.jpg'></img>
            <img className={classes.ava} src={props.profile.photos.small || userPhoto} ></img>
            {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

            {!isUpdate && <ProfileData profile={props.profile} isOwner={props.isOwner}
                updateUserStatus={props.updateUserStatus}
                status={props.status}
                setProfileEditMode={() => { setIsUpdate(true) }} />}
            {isUpdate && <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onProfileUpdate} />}

        </div>
    )
}


export default ProfileInfo;