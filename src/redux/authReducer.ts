import { securityAPI } from './../api/security-api';
import { authAPI } from './../api/auth-api';
import { ResultCodesCaptcha, ResultCodesEnum  } from './../api/api';
import { FormAction, stopSubmit } from 'redux-form';
import {InferActionsTypes, BaseThunkType } from './redux-store';


const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }

        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state
    }

}


export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: SET_USER_DATA, payload: { userId, email, login, isAuth }} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } } as const),
}


export const authMe = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.auth()
        if (data.resultCode === ResultCodesEnum.Success) {
            let { id, email, login } = data.data;
            if (id) {
                dispatch(actions.setAuthUserData(id, email, login, true))
            }
        }
    }
}

export const authLogin = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.authLogin(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(authMe());
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : "Some error"
            dispatch(stopSubmit("login", { _error: message }));
            if (data.resultCode === ResultCodesCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
        }
    }
}

export const authLogout = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.authLogout()
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
    }
}

export default authReducer