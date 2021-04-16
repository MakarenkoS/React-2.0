
import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/api';

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'; 
const GET_STATUS = 'profile/GET_STATUS'; 
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'; 

export const addPostActionCreator = (text) => ({ type: ADD_POST, text });
export const deletePostActionCreator = (id) => ({ type: DELETE_POST, id });
export const setPhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
    
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const loadProfile = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data));
    }
}

export const getStatus = (status) => ({ type: GET_STATUS, status });

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(getStatus(response.data))
    }

}

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(getStatus(status))
        }
    }
}

export const savePhoto = (file) => {
    return async (dispatch, ) => {
        let response = await profileAPI.savePhoto(file);
        
        if (response.data.resultCode === 0) {
            dispatch(setPhotoSuccess(response.data.data.photos))
        }
    }
}


export const updateProfile = (profile) => {
    return async (dispatch, getState) => {
        let response = await profileAPI.updateProfile(profile);
        
        if (response.data.resultCode === 0) {
            dispatch(loadProfile(getState().auth.userId))
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("profileEditForm",  {"contacts": {"facebook": message} }))
            return Promise.reject()
        }
    }
}

let initialState = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: "It's my first post", likesCount: 10 },
        { id: 3, message: "It's my second post", likesCount: 25 },
    ],

    profile: null,
    status: '',

}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.text,
                likesCount: 0,
            };

            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: '',
            }
        }


        case SET_USER_PROFILE: {
    
            return {
                ...state,
                profile: action.profile,
            }
        }

        case GET_STATUS: {
           
            return {
                ...state,
                status: action.status,
            }
        }


        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter( p=> p.id !== action.id)
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} 
            }
        }


        default:
            return state
    }

}

export default profileReducer