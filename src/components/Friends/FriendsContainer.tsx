import React from 'react';
import Friends from './Friends';
import {connect} from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { FriendsDataType } from '../../types/types';

type MapStatePropsType = {
    friendsData: Array<FriendsDataType>
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        friendsData: state.sidebarPage.friendsData
    }
}



const FriendsContainer = connect(mapStateToProps)(Friends);

export default FriendsContainer;