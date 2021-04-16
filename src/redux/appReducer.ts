
import { authMe } from './authReducer';


const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};


const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitialSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const intializedSuccess = (): InitialSuccessActionType  => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authMe());
    Promise.all([promise])
        .then(() => {
            dispatch(intializedSuccess());
        })

}

export default appReducer;