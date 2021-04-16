import { userAPI } from "../api/api";
import {updateObjectInArray} from "../utils/validators/object-helpers";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'users/SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 25,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    fake: 0

    // users: [
    //     {id:1, photoUrl: './../../img/user.png', fullName: 'Dima', status:' Boss', followed: true, location: { country: 'Belarus', city: 'Minsk'}},
    //     {id:2, photoUrl: './../../img/user.png', fullName: 'Andrew', status:' Boss 2', followed: true, location: { country: 'Russia', city: 'Moscow'}},
    //     {id:3, photoUrl: './../../img/user.png', fullName: 'Sasha', status:' Hey', followed: false, location: { country: 'USA', city: 'NY'}},
    //     {id:4, photoUrl: './../../img/user.png', fullName: 'Ivan', status:' Bye', followed: true, location: { country: 'Ukraine', city: 'Kiev'}},
    // ]
}

export const followSuccess = (id) => ({ type: FOLLOW, userId: id });
export const unfollowSuccess = (id) => ({ type: UNFOLLOW, userId: id });
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCount = (totalCount) => ({ type: SET_USERS_TOTAL_COUNT, totalCount })
export const setIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingInProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        let data = await userAPI.getUsers(page, pageSize);

        dispatch(setCurrentPage(page));
        dispatch(setIsFetching(false));
        dispatch(setUsersTotalCount(data.totalCount));
        dispatch(setUsers(data.items));

    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    
    dispatch(toggleFollowingInProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
} 

export const follow = (userId) => {
    return  (dispatch) => {
        let apiMethod = userAPI.follow.bind(userAPI);
        followUnfollowFlow(dispatch, userId, apiMethod, followSuccess)
    }
}

export const unfollow = (userId) => {
    return  (dispatch) => {
        let apiMethod = userAPI.unfollow.bind(userAPI);
        followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess)
    }
}


const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'FAKE': 
            console.log('FAKE')
            return {
                ...state,
                fake: state.fake + 1
            }
            
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId, "id", {followed: true})
                // users: state.users.map((u) => {
                //     if (u.id == action.userId) {
                //         return { ...u, followed: true }
                //     }
                //     return u;
                // })
            }

        case UNFOLLOW:
            
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId, "id", {followed: false} )
                // users: state.users.map((u) => {
                //     if (u.id == action.userId) {
                //         return { ...u, followed: false }
                //     }
                //     return u;
                // })
            }

        case SET_USERS:
            return { ...state, users: [...action.users] }

        case SET_CURRENT_PAGE:

            return { ...state, currentPage: action.currentPage }

        case SET_USERS_TOTAL_COUNT:
            let count = action.totalCount;
            // if (count >= 250) count = 250
            return { ...state, totalUsersCount: count }

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching } 

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }

        default:
            return state

    }

}

export default usersReducer;