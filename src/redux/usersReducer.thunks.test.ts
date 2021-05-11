import { APIResponseType, ResultCodesEnum } from './../api/api';

import { userAPI } from './../api/users-api';
import { InitialStateType, follow,unfollow, actions } from './usersReducer';
jest.mock('../api/users-api')
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>

// userAPIMock.follow

// let state: InitialStateType

// beforeEach( () => {
//     state = {
//         users: [
//             {
//                 id: 0, 
//                 name: 'Dymich 0',
//                 followed: false,
//                 uniqueUrlName: true,
//                 photoUrl: 'http://',
//                 photos: {
//                     small: null,
//                     large: null
//                 },
//                 status: "status 0",
             
//             },
//             {
//                 id: 1, 
//                 name: 'Dymich 1',
//                 followed: false,
//                 uniqueUrlName: true,
//                 photoUrl: 'http://',
//                 photos: {
//                     small: null,
//                     large: null
//                 },
//                 status: "status 1"
             
//             },
//             {
//                 id: 2, 
//                 name: 'Dymich 2',
//                 followed: true,
//                 uniqueUrlName: true,
//                 photoUrl: 'http://',
//                 photos: {
//                     small: null,
//                     large: null
//                 },
//                 status: "status 2"
             
//             },
//             {
//                 id: 3, 
//                 name: 'Dymich 3',
//                 followed: true,
//                 uniqueUrlName: true,
//                 photoUrl: 'http://',
//                 photos: {
//                     small: null,
//                     large: null
//                 },
//                 status: "status 3"
//             }
//         ],
//         pageSize: 25 ,
//         totalUsersCount: 0 ,
//         currentPage: 1,
//         isFetching: false,
//         followingInProgress: [] //array of users id
//     }


// })

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

const dispatchMock = jest.fn()  
const getStateMock = jest.fn()

beforeEach( () => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})


userAPIMock.follow.mockReturnValue(Promise.resolve(result))
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test("follow thunk ",async () => {
    const thunk = follow(1)
  
   
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})


test("unfollow thunk ",async () => {
    const thunk = unfollow(1)
    
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})

