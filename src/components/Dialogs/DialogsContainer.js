import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from './../../redux/dialogsReducer'
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (text) => { 
            dispatch(sendMessageActionCreator(text));
        },
       
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

