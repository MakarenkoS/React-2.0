import React from 'react';
import { useSelector } from 'react-redux';
import { FilterType } from '../../redux/usersReducer';
import {Users} from './Users';
import Preloader from '../common/Preloader/Preloader';

import {getIsFetching} from '../../redux/usersSelectors';
import { UsersType } from '../../types/types';


type UsersPagePropsType = {
    title: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            <h2> {props.title}</h2>
            {isFetching ? <Preloader /> : null}
            <Users/>
        </>
    )
}

// class UsersContainer extends React.Component<PropsType> {


//     // componentDidMount() {
//     //     const { currentPage, pageSize, filter } = this.props
//     //     this.props.getUsers(currentPage, pageSize, filter);
//     // }

//     // onPageChanged = (pageNumber: number) => {
//     //     const { pageSize, filter } = this.props
//     //     this.props.getUsers(pageNumber, pageSize, filter)
//     // }

//     // onFilterChanged = (filter: FilterType) => {
//     //     const { pageSize } = this.props
//     //     this.props.getUsers(1, pageSize, filter);
//     // }

//     render() {

//         return <>
//             <h2> {this.props.title}</h2>
//             {this.props.isFetching ? <Preloader /> : null}
//             <Users
//                 // pageSize = {this.props.pageSize} 
//                 // totalUsersCount = {this.props.totalUsersCount} 
//                 // currentPage = {this.props.currentPage}
//                 // onPageChanged={this.onPageChanged}
//                 // onFilterChanged={this.onFilterChanged}
//                 // users={this.props.users}
//                 // follow={this.props.follow}
//                 // unfollow={this.props.unfollow}
//                 followingInProgress={this.props.followingInProgress}
//             />
//         </>
//     }
// }


// let mapStateToProps = (state: AppStateType): MapStatePropsType => {
//     return {

//         users: getCurrentUsers(state),
//         // users: state.usersPage.users,
//         pageSize: getPageSize(state),
//         // pageSize: state.usersPage.pageSize,
//         totalUsersCount: getTotalUsersCount(state),
//         // totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: getCurrentPage(state),
//         // currentPage: state.usersPage.currentPage,
//         isFetching: getIsFetching(state),
//         // isFetching: state.usersPage.isFetching,
//         followingInProgress: getFollowingInProgress(state),
//         // followingInProgress: state.usersPage.followingInProgress,
//         filter: getUsersFilter(state)
//     }
// }


// export default compose(
//     connect<MapStatePropsType, MapDispatchPropsType, OwnPropsPropsType, AppStateType>(mapStateToProps, {
//     }),
// )
//     (UsersContainer)


// export default connect(mapStateToProps, {
//     follow,
//     unfollow,
//     getUsers,    
//     toggleFollowingInProgress

// })(withAuthRedirect(UsersContainer));