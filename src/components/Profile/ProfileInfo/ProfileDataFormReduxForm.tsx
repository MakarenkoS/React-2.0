import React from 'react';
import classes from './ProfileInfo.module.css';
import errorClasses from './../../common/FormsControls/FormControls.module.css';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { requireFiled, maxLengthCreator } from '../../../utils/validators/validator';
import { Input, Textarea } from '../../common/FormsControls/FormControls';
import { ProfileType } from '../../../types/types';



// type PropsType = {
//     handleSubmit?:any
//     profile: ProfileType
//     error?: string
//     initialValues: any
//     onSubmit: (formData: any) => void
// }

type ProfileFormOwnProps = {
    profile:  ProfileType
}




const maxLength50 = maxLengthCreator(50);


let ProfileDataForm:React.FC<InjectedFormProps<ProfileType, ProfileFormOwnProps> & ProfileFormOwnProps>= ({ handleSubmit, profile, error }) => {
    return <div>
        <form onSubmit={handleSubmit}>
            <div>
                <p>Имя:</p>
                <Field component={Input} name={"fullName"} placeholder={"Ваше имя"}
                    validate={[requireFiled, maxLength50]} />

                <p>Ищу работу:</p>
                <Field component={"input"} type={"checkbox"} name={"lookingForAJob"} />

                <p>Профессиональные навыки:</p>
                <Field component={Textarea} name={"lookingForAJobDescription"} placeholder={"Ваши навыки"} />

                <p>Обо мне:</p>
                <Field component={Textarea} name={"aboutMe"} placeholder={"О Вас"} />


                {Object.keys(profile.contacts).map((key) => {
                    return <p className={classes.contact} key = {key}>
                        <b>{key}:</b>
                        <Field component={Input} name={"contacts." + key} placeholder={key} />
                    </p>
                })}

                {error && <div className={errorClasses.summaryError}>
                    {error}
                </div>}

            </div>
            <div>
                <button > Save</button>
            </div>
        </form>
    </div>
}


const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileFormOwnProps>({form: "profileEditForm"})(ProfileDataForm)


export default ProfileDataFormReduxForm;