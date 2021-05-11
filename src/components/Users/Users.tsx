import React, { useEffect } from 'react';
import classes from './Users.module.css';
import userPhoto from './../../assets/images/user.png';
import Paginator from '../common/Paginator/Paginator';
import { User } from './User';
import { UsersType } from '../../types/types';
import { UsersSearchForm } from './UserSearchForm';
import { FilterType, getUsers, follow, unfollow } from '../../redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getCurrentUsers, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter } from '../../redux/usersSelectors';
import { useHistory } from 'react-router';
import * as queryString from 'querystring';




type PropsType = {}
type QueryParamsType = {term?: string, friend?: string, page?: string}


export const Users: React.FC<PropsType> = (props) => {
    
    const users = useSelector(getCurrentUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()


    useEffect( ()=> {
        const parsed = queryString.parse( history.location.search.substr(1)) as QueryParamsType
        console.log('UseEffect1', parsed)
        
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null :  parsed.friend === "true" ? true : false }

        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect( () => {
        
        // const query: QueryParamsType = { }
        // if (!!filter.term) query.term = filter.term
        // if (filter.friend !== null) query.friend = String(filter.friend)
        // if (currentPage !== 1) query.page = String(currentPage)

        history.push( {
            pathname: '/users',
            // search: queryString.stringify(query)
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>
            <div>
                <UsersSearchForm onFilterChanged = {onFilterChanged}/>
            </div>
            <Paginator onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage} portionSize={15} />

            {users.map(u => {

                return <User unfollow={unfollowUser} follow={followUser} followingInProgress={followingInProgress}
                    user={u} key={u.id} />

            })
            }


        </div>
    )

}

