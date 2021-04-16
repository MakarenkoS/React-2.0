import *  as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ae913fa2-0c93-442f-bc58-bc666469fcce'
    }
})


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },


}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
        .then(response => response.data)
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },

    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status});
    },

    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        });
    },

    updateProfile(profile) {
        return instance.put(`profile/`, profile);
    },
}

export const authAPI = {
    auth() {
        return instance.get(`auth/me`)
        .then(response => response.data)
    },

    authLogin(email, password, rememberMe = false, captcha=null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
        .then(response => response.data) 
    },

    authLogout() {
        return instance.delete(`auth/login`)
        .then(response => response.data) 
    }
 }

 export const securityAPI = {
     getCaptchaUrl() {
        return instance.get('security/get-captcha-url');
     }
 }