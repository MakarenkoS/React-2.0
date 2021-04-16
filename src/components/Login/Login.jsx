import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { authLogin, authLogout } from '../../redux/authReducer';
import { maxLengthCreator, requireFiled } from '../../utils/validators/validator';
import { Input } from '../common/FormsControls/FormControls';
import classes from './../common/FormsControls/FormControls.module.css';
const maxLength25 = maxLengthCreator(25);


const LoginForm = ({captchaUrl, handleSubmit, error}) => {
    return <div>
        <form onSubmit ={handleSubmit} >
            <div>
                <Field name="email" placeholder={"email"} component={Input} 
                validate ={[requireFiled, maxLength25]} />
            </div>
            <div>
                <Field name="password" placeholder={"password"} component={Input} 
                validate ={[requireFiled, maxLength25]} />
            </div>
            <div>
                <Field type="checkbox" name="rememberMe" component={"input"} type={"checkbox"} /> 
                Remember me
            </div>


            {error && <div className = {classes.summaryError}>
               {error}
            </div>}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl &&   <Field name="captcha" placeholder={"Enter captcha here"} component={Input} 
                             validate ={[requireFiled]} /> }
            
            
        

            <div>{captchaUrl}</div>

            <button> Login </button>

        </form>
    </div>
}


const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
   
    const onFormSubmit = (formData) => {
        let {email, password, rememberMe, captcha} = formData;
        props.authLogin(email, password, rememberMe = false, captcha);
    }

    if (props.isAuth) return  <Redirect to='/Profile'/>
    return <div>
        <h1> Login </h1>
        <LoginReduxForm onSubmit={onFormSubmit} captchaUrl = {props.captchaUrl} />
        {/* {props.captchaUrl ? <img src = {props.captchaUrl} /> : null}  */}

    </div>
}

let mapDispatchToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapDispatchToProps, {authLogin, authLogout})(Login)