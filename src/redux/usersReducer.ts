import { AppStateType, InferActionsTypes, BaseThunkType } from './redux-store';
import { UsersType } from '../types/types';
import { Dispatch } from 'redux'
import { userAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/validators/object-helpers";
import { ThunkAction } from 'redux-thunk';
import { APIResponseType } from '../api/api';
import { getTokenSourceMapRange } from 'typescript';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 25 as number,
    totalUsersCount: 0 as number,
    filter:  {
        term: '',
        friend: null as null | boolean
    },
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number> //array of users id
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const actions = {

    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),

    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),

    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),

    setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const),

    setUsersTotalCount: (totalCount: number) => ({ type: 'SET_USERS_TOTAL_COUNT', totalCount } as const),

    setIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),

    setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),

    toggleFollowingInProgress: (isFetching: boolean, userId: number) => (
        { type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),



}


export const getUsers = (page: number,
    pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));
        let data = await userAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setUsersTotalCount(data.totalCount));
        dispatch(actions.setUsers(data.items));

    } 
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionsTypes) => {

    dispatch(actions.toggleFollowingInProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = userAPI.follow.bind(userAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = userAPI.unfollow.bind(userAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess)
    }
}


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
                // users: state.users.map((u) => {
                //     if (u.id == action.userId) {
                //         return { ...u, followed: true }
                //     }
                //     return u;
                // })
            }

        case 'UNFOLLOW':

            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
                // users: state.users.map((u) => {
                //     if (u.id == action.userId) {
                //         return { ...u, followed: false }
                //     }
                //     return u;
                // })
            }

        case 'SET_USERS':

            return { ...state, users: action.users }

        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }

        case 'SET_USERS_TOTAL_COUNT': {

            let count = action.totalCount

            return { ...state, totalUsersCount: count }
        }

        case 'TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }

        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }

        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }

        default:
            return state

    }
}



export default usersReducer;