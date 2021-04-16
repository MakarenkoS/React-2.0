
import {createSelector} from 'reselect';

export const getCurrentUsersSelector = (state) => {
    return state.usersPage.users;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}


export const getCurrentUsers= createSelector(getCurrentUsersSelector, getCurrentPage, (users, page) => {
    return users.filter(u => true)
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}