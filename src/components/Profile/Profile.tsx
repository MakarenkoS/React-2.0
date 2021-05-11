import React, { useEffect } from 'react';
import classes from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { updateUserStatus, savePhoto, updateProfile } from '../../redux/profileReducer';


type PropsType = {
  isOwner: boolean
}

export const Profile:React.FC<PropsType>  = (props) => {
    const profile = useSelector( (state: AppStateType) => state.profilePage.profile)
    const status  = useSelector( (state: AppStateType) => state.profilePage.status)

    const dispatch = useDispatch()

    const updateUserStatusUse = (text: string) => {
      dispatch(updateUserStatus(text))
    }
    const savePhotoUse = (file: File) => {
      dispatch(savePhoto(file))
    }
    
    const updateProfileUse = (profile: ProfileType): any=> {
     return dispatch(updateProfile(profile))
    }
    
   

    return <div>
      <ProfileInfo profile={profile} status = {status} 
                   updateUserStatus={updateUserStatusUse} isOwner={props.isOwner} 
                   savePhoto={savePhotoUse} updateProfile={updateProfileUse}/>
      <MyPostsContainer/>
  </div>
}

