import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { loadProfile, getUserStatus, updateUserStatus, savePhoto, updateProfile } from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { userAPI } from '../../api/api';

class ProfileContainer extends React.Component {

 
 
  refreshProfile() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }
    if (userId) {
      this.props.loadProfile(userId);
      this.props.getUserStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }



  render() {
    return (
      <Profile {...this.props} isOwner = {!this.props.match.params.userId} />
    )
  }
}


let mapStateToProps = (state) => {
  return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  })
}


export default compose(
  connect(mapStateToProps, { loadProfile, getUserStatus, updateUserStatus, savePhoto, updateProfile}),
  withRouter,
  // withAuthRedirect
)(ProfileContainer)

// let authRedirectComponent = withAuthRedirect(ProfileContainer)
// let WithUrlDataContainerComponent = withRouter(authRedirectComponent);

// export default connect(mapStateToProps,{loadProfile})(WithUrlDataContainerComponent);