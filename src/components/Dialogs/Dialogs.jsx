import React from 'react';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormControls';
import { maxLengthCreator, requireFiled } from '../../utils/validators/validator';

const maxLength25 = maxLengthCreator(25);

let MessageForm = (props) => {
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


let MessageReduxForm = reduxForm({
    form: 'messageForm'
})(MessageForm)


const Dialogs = (props) => {

    const onFormSubmit = (formData) => {
        console.log(formData)
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