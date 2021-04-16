import React from 'react';
import Friends from './Friends';
import {connect} from 'react-redux';


let mapStateToProps = (state) => {
    return {
        friendsData: state.sidebarPage.friendsData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

    }
}

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer;