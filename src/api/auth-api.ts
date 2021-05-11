import { instance, APIResponseType, ResultCodesCaptcha, ResultCodesEnum } from './api';


type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseDataType = {
    userId: number,
}


export const authAPI = {
    auth() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
            .then(response => response.data)
    },

    authLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data)
    },

    authLogout() {
        return instance.delete<APIResponseType>(`auth/login`)
            .then(response => response.data)
    }
}