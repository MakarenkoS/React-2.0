import { AppStateType } from './redux-store';

import {createSelector} from 'reselect';

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login
}

export const selectCurrentUserId = (state: AppStateType) => {
    return state.auth.userId
}


