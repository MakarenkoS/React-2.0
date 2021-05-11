import { AppStateType } from './redux-store';

import {createSelector} from 'reselect';

export const getCurrentUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}


export const getCurrentUsers= createSelector(getCurrentUsersSelector, getCurrentPage, (users, page) => {
    return users.filter(u => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}


export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}
