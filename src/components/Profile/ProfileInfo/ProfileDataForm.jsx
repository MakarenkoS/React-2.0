import React from 'react';
import classes from './ProfileInfo.module.css';
import errorClasses from './../../common/FormsControls/FormControls.module.css';
import { Field, reduxForm } from 'redux-form';
import { requireFiled, maxLengthCreator } from './../../../utils/validators/validator';
import { Input, Textarea } from '../../common/FormsControls/FormControls';


const maxLength50 = maxLengthCreator(50);

let ProfileDataForm = ({ handleSubmit, profile, error }) => {
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

ProfileDataForm = reduxForm({
    form: "profileEditForm"
})(ProfileDataForm)
// return <div className={classes.info}>
//         <div>
//             <p>
//                 <b>Status:</b>
//                 <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
//             </p>

//             <p>
//                 <b> Обо мне:</b>
//                 <p>{props.profile.aboutMe} </p>
//             </p>

//             <p> Имя: <span>{props.profile.fullName}</span></p>
//         </div>

//         <div className={classes.jobLooking}>
//             <span> Ищу работу:  </span>
//             {props.profile.lookingForAJob ?
//                 <span className={classes.jobTrue}>Да</span> :
//                 <span className={classes.jobFalse}>Нет</span>}
//             <p> Профессиональные навыки: </p>
//             {props.profile.lookingForAJobDescription}
//         </div>


//         <div>
//             <ul className={classes.contacts}>
//                 <Contacts contacts={props.profile.contacts} />
//             </ul>
//         </div>

//     </div>
// }

// const Contacts = (props) => {
//     return (<>

//         {Object.entries(props.contacts).map(([key, value]) => {
//             return <li key={key}> <b>{key}</b> : {value} </li>
//         })
//         }
//     </>
//     )
// }

export default ProfileDataForm;