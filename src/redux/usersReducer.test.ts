import { InitialStateType } from './usersReducer';
import { UsersType } from "../types/types"
import usersReducer, { actions } from "./usersReducer"

let state: InitialStateType

beforeEach( () => {
    state = {
        users: [
            {
                id: 0, 
                name: 'Dymich 0',
                followed: false,
                uniqueUrlName: true,
                photoUrl: 'http://',
                photos: {
                    small: null,
                    large: null
                },
                status: "status 0",
             
            },
            {
                id: 1, 
                name: 'Dymich 1',
                followed: false,
                uniqueUrlName: true,
                photoUrl: 'http://',
                photos: {
                    small: null,
                    large: null
                },
                status: "status 1"
             
            },
            {
                id: 2, 
                name: 'Dymich 2',
                followed: true,
                uniqueUrlName: true,
                photoUrl: 'http://',
                photos: {
                    small: null,
                    large: null
                },
                status: "status 2"
             
            },
            {
                id: 3, 
                name: 'Dymich 3',
                followed: true,
                uniqueUrlName: true,
                photoUrl: 'http://',
                photos: {
                    small: null,
                    large: null
                },
                status: "status 3"
            }
        ],
        pageSize: 25 ,
        totalUsersCount: 0 ,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] //array of users id
    }


})



test("follow success", () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test("unfollow success", () => {

    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})