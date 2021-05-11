import { UsersType } from './../types/types';
import { instance, APIResponseType } from './api';

type GetUsersResponseType = { 
    items: Array<UsersType>
    totalCount: number
    error: string | null
}


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string='', friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + 
        (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },

    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}