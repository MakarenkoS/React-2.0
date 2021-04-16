import React from 'react';
import classes from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
    return <div>
      <ProfileInfo profile={props.profile} status = {props.status} 
                   updateUserStatus={props.updateUserStatus} isOwner={props.isOwner} 
                   savePhoto={props.savePhoto} updateProfile={props.updateProfile}/>
      <MyPostsContainer/>
  </div>
}

export default Profile;