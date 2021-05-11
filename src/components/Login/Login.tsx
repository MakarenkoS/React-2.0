
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { authLogin, authLogout } from '../../redux/authReducer';
import { AppStateType } from '../../redux/redux-store';
import { maxLengthCreator, requireFiled } from '../../utils/validators/validator';
import { Input } from '../common/FormsControls/FormControls';
import classes from './../common/FormsControls/FormControls.module.css';

const maxLength25 = maxLengthCreator(25);

type LoginFormOwnProps = {
    captchaUrl: string | null
}


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ captchaUrl, handleSubmit, error }) => {
    return <div>
        <form onSubmit={handleSubmit} >
            <div>
                <Field name="email" placeholder={"email"} component={Input}
                    validate={[requireFiled, maxLength25]} />
            </div>
            <div>
                <Field name="password" placeholder={"password"} component={Input}
                    validate={[requireFiled, maxLength25]} />
            </div>
            <div>

                <Field type="checkbox" name="rememberMe" component={"input"}  />
                Remember me
            </div>


            {error && <div className={classes.summaryError}>
                {error}
            </div>}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && <Field name="captcha" placeholder={"Enter captcha here"} component={Input}
                validate={[requireFiled]} />}

            <div>{captchaUrl}</div>

            <button> Login </button>
        </form>
    </div>
}


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}




export const LoginPage: React.FC = (props) => {

    const captchaUrl = useSelector( (state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector( (state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onFormSubmit = (formData: LoginFormValuesType) => {
        let { email, password, rememberMe, captcha } = formData;
        dispatch(authLogin(email, password, rememberMe = false, captcha))
    }

    if (isAuth) return <Redirect to='/Profile' />
   

    return (
        <div>
            <h1> Login </h1>
            <LoginReduxForm onSubmit={onFormSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}

