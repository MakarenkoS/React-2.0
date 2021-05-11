import React from 'react';
import {actions} from '../../redux/dialogsReducer'
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AnyMxRecord } from 'node:dns';
import { AppStateType } from '../../redux/redux-store';
import { DialogType, MessageType } from '../../types/types';



type MapStatePropsType = {
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
}




let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
    }
}

// let mapDispatchToProps = (dispatch: any) => {
//     return {
//         sendMessage : (text:string) => { 
//             dispatch(actions.sendMessageActionCreator(text));
//         },
       
//     }
// }
// let sendMessage = actions.sendMessageActionCreator

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.sendMessageActionCreator}),
    withAuthRedirect
)(Dialogs)

