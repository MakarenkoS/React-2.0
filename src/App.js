import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
// import ProfileContainer from './components/Profile/ProfileContainer';
import { Route, BrowserRouter, withRouter, Switch } from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import FriendsContainer from './components/Friends/FriendsContainer';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';

import { compose } from 'redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { Suspense } from 'react';
import { withSuspense } from './hoc/withSuspense';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));



let NewsComponent = () => <News />



class App extends React.Component {

  componentDidMount() {

    this.props.initializeApp();

  }

  render() {

    {
      if (!this.props.initialized) {
        return <Preloader />
      }
    }
    return (

      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav />
        <Route> <FriendsContainer /> </Route>


        <div className='app-wrapper-content'>

           <Switch>
            <Route exact path='/'
              render={withSuspense(ProfileContainer)}
            />
            <Route path='/dialogs'>
              <Suspense fallback={<div> <Preloader /> </div>}>
                <DialogsContainer />
              </Suspense>

            </Route>

            <Route path='/profile/:userId?'
              render={withSuspense(ProfileContainer)}
            />

            <Route path='/users'><UsersContainer /></Route>

            <Route path='/news' component={NewsComponent}></Route>

            <Route path='/music' component={Music}></Route>
            <Route path='/settings' component={Settings}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='*'><div>Not Found</div></Route>
            </Switch>
        </div>
      </div >


    )
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App)





