import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, toggleFollowingInProgress, getUsers } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from './../common/Preloader/Preloader'; 
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getPageSize,  getCurrentUsers, getTotalUsersCount, getCurrentPage, 
         getIsFetching,  getFollowingInProgress, getCurrentUsersSelector, 
         } from '../../redux/usersSelectors';


class UsersContainer extends React.Component {
   

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize); 
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
       
        return <>
        {this.props.isFetching ? <Preloader/>: null}
        <Users totalUsersCount = {this.props.totalUsersCount} 
                      pageSize = {this.props.pageSize} 
                      currentPage = {this.props.currentPage}
                      onPageChanged = {this.onPageChanged}
                      users = {this.props.users}
                      follow = {this.props.follow}
                      unfollow = {this.props.unfollow}
                      toggleFollowingInProgress = {this.props.toggleFollowingInProgress}
                      followingInProgress = {this.props.followingInProgress}
                      />
        </>
    }
}


let mapStateToProps = (state) => {
  
    return {
        
        users: getCurrentUsers(state),
       
        // users: state.usersPage.users,
        pageSize: getPageSize(state),
        // pageSize: state.usersPage.pageSize,
        totalUsersCount: getTotalUsersCount(state),
        // totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: getCurrentPage(state),
        // currentPage: state.usersPage.currentPage,
        isFetching: getIsFetching(state),
        // isFetching: state.usersPage.isFetching,
        followingInProgress: getFollowingInProgress(state),
        // followingInProgress: state.usersPage.followingInProgress,

    }
}


export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        getUsers,    
        toggleFollowingInProgress
    }),
)
(UsersContainer)


// export default connect(mapStateToProps, {
//     follow,
//     unfollow,
//     getUsers,    
//     toggleFollowingInProgress

// })(withAuthRedirect(UsersContainer));