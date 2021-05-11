import React from 'react';
import { actions } from '../../../redux/profileReducer';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';
import {connect} from 'react-redux';
import { PostDataType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';

type MapStatePropsType = {
    postsData: Array<PostDataType>
}

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        postsData: state.profilePage.postsData,
    } 
}


const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostActionCreator})(MyPosts)

export default MyPostsContainer;