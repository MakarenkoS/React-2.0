import { BaseThunkType, InferActionsTypes } from './redux-store';
import { PostDataType, ProfileType, PhotosType} from './../types/types';
import { FormAction, stopSubmit } from 'redux-form';
import { profileAPI } from '../api/profile-api';

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'; 
const GET_STATUS = 'profile/GET_STATUS'; 
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'; 


let initialState = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: "It's my first post", likesCount: 10 },
        { id: 3, message: "It's my second post", likesCount: 25 },
    ] as Array<PostDataType>,

    profile: null as ProfileType | null,
    status: '',
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const actions = {
    addPostActionCreator: (text: string) => ({ type: ADD_POST, text } as const),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    getStatus: (status:string)  => ({ type: GET_STATUS, status } as const),
    deletePostActionCreator: (id:number)  => ({ type: DELETE_POST, id } as const),
    setPhotoSuccess: (photos: PhotosType)  => ({type: SAVE_PHOTO_SUCCESS, photos} as const)
}


export const loadProfile = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data));
    }
}

export const getUserStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let status = await profileAPI.getStatus(userId)
        dispatch(actions.getStatus(status))
    }
}

export const updateUserStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.resultCode === 0) {
            dispatch(actions.getStatus(status))
        }
    }
}

export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        
        if (response.resultCode === 0) {
            dispatch(actions.setPhotoSuccess(response.data.photos))
        }
    }
}


export const updateProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const response = await profileAPI.updateProfile(profile);
        
        if (response.resultCode === 0) {
            if (userId !== null) {
                dispatch(loadProfile(userId))
            } else {
                throw new Error('userId can\'t be null')
            }
        } else {
            let message = response.messages.length > 0 ? response.messages[0] : "Some error"
            dispatch(stopSubmit("profileEditForm",  {"contacts": {"facebook": message} }))
            return Promise.reject()
        }
    }
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        default:
            return state
    }

}

export default profileReducer