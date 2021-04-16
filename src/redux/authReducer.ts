import { setAuthUserData } from './authReducer';
import { authAPI, securityAPI } from '../api/api';
import {stopSubmit} from 'redux-form';


const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    setIsFetching: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType= {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    setIsFetching: true,
    captchaUrl: null
};

const authReducer = (state = initialState, action: any) : InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA: {
           
            return {
                ...state,
                ...action.payload,
            }
        }

        case GET_CAPTCHA_URL_SUCCESS: {
    
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state
    }

}

// type setAuthUserDataActionPayloadType = {
//     userId: number
//     email: string
//     login: string
//     isAuth: boolean
//     captcha: string
// }

// type setAuthUserDataActionType = {
//     type: typeof SET_USER_DATA
//     payload: setAuthUserDataActionPayloadType
// }

export const setAuthUserData = (userId: number, email: string, login: string, isAuth: boolean, captcha: string) => (
    { type:  SET_USER_DATA, payload: {userId, email, login, isAuth, captcha} 
})

export const getCaptchaUrlSuccess = (captchaUrl) => ({ type:  GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const authMe = () => {
    return async (dispatch) => {
        let data = await authAPI.auth()
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    if (id) {
                        dispatch(setAuthUserData(id, email, login, true))
                    }          
            }
    }
} 

export const authLogin = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let data = await authAPI.authLogin(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(authMe());
        }  else {
            let message = data.messages.length > 0 ? data.messages[0] : "Some error"
            dispatch(stopSubmit("login", { _error: message }));
            if(data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
        }
    }
}

export const authLogout = () => {
    return async (dispatch) => {
        let data = await authAPI.authLogout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}


export const getCaptchaUrl = () => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    }
}

export default authReducer