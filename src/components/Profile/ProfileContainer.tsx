import React, { useEffect } from 'react';
import {Profile} from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfile, getUserStatus, updateUserStatus, savePhoto, updateProfile } from '../../redux/profileReducer';
import { RouteComponentProps, useHistory, useParams, withRouter } from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store'


type ParamsType = {
  userId: string
}


type ProfilePageTypes = {
  // isOwner: boolean
}

export const ProfilePage: React.FC<ProfilePageTypes> = React.memo(() => {
  const params: ParamsType= useParams()
  const history = useHistory()
  const authorizedUserId = useSelector( (state: AppStateType) => state.auth.userId)

  const dispatch = useDispatch()

  const refreshProfile = () => {
    
    let userId: null | number = +params.userId
    
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        history.push('/login');
      }
    }
    if (!userId) {
      console.error('No userId')
    } else {
      dispatch(loadProfile(userId))
      dispatch(getUserStatus(userId))
    }
      
  }

  useEffect( () => {refreshProfile()} , [])
  useEffect( () => {refreshProfile()} , [params.userId])

  const isOwner:boolean = !params.userId
  return  (
     <Profile isOwner = {isOwner} />
   )
})





