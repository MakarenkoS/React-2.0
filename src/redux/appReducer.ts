import { UsersType } from './../types/types';
import { authMe } from './authReducer';
import { AppStateType, InferActionsTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk';


const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';


let initialState= {
    initialized: false
}

export type  InitialStateType = typeof initialState

type ActionType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
                
            }
        }
                    
        default:
            return state
    }
}


export const actions = {
    intializedSuccess: () => ({ type: INITIALIZED_SUCCESS} as const),
}



type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>


export const initializeApp = ():ThunkType => (dispatch: any) => {
    let promise = dispatch(authMe());
    Promise.all([promise])
        .then(() => {
            
            dispatch(actions.intializedSuccess());
        })

}

export default appReducer;