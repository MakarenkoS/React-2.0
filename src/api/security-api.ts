import { instance, APIResponseType} from './api';

type getCaptchaUrlDataType = {
   url: string
}

 export const securityAPI = {
    getCaptchaUrl() {
       return instance.get<getCaptchaUrlDataType>('security/get-captcha-url')
       .then(response => response.data)
    }
}

