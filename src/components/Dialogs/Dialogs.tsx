import React from 'react';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormControls';
import { maxLengthCreator, requireFiled } from '../../utils/validators/validator';
import { DialogType, MessageType } from '../../types/types';

const maxLength25 = maxLengthCreator(25);

type MessageFormValuesType = {
    messageText: string
}

type PropsType = {}


let MessageForm: React.FC<InjectedFormProps<MessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name="messageText" placeholder={"EnterMessage"} component={Textarea}
                    validate ={[requireFiled, maxLength25]} />
                </div>

                <button>Add Message</button>
            </form>
        </div>
    )
}


let MessageReduxForm = reduxForm<MessageFormValuesType, PropsType>({
    form: 'messageForm'
})(MessageForm)


type DialogsFormPropsType = {
    sendMessage: (messageText: string) => void
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
}

const Dialogs:React.FC<DialogsFormPropsType> = (props) => {

    const onFormSubmit = (formData: MessageFormValuesType) => {
        props.sendMessage(formData.messageText);
    }

    let dialogElements = props.dialogsData.map
        ((d) => <DialogItem id={d.id} name={d.name} />)

    let messageElements = props.messagesData.map
        ((m) => <Message id={m.id} message={m.message} sender={m.sender} />)

    return (
        <div className={classes.dialogs}>
            <ul className={classes.dialogs_items}>
                {dialogElements}
            </ul>
            <ul className={classes.messages}>
                {messageElements}
            </ul>
            <div className={classes.sendArea}>
                <MessageReduxForm onSubmit={onFormSubmit} />
            </div>
        </div>

    )

}

export default Dialogs;