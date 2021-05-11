
import { ProfileType, UsersType, ContactsType, PhotosType } from './../types/types';
import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ae913fa2-0c93-442f-bc58-bc666469fcce'
    }
})

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}



export enum ResultCodesEnum {
    Success = 0,
    Error = 1, 
}

export enum ResultCodesCaptcha {
    CaptchaIsRequired = 10
}


