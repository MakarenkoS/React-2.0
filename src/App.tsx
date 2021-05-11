import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
// import ProfileContainer from './components/Profile/ProfileContainer';
import { Route, withRouter, Switch, Redirect, NavLink, Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { UsersPage } from './components/Users/UsersContainer';

import { LoginPage } from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { Suspense } from 'react';
import { AppStateType } from './redux/redux-store';
import { ProfilePage } from './components/Profile/ProfileContainer'
import { Button, Row, Col } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { AppHeader } from './components/Header/Header';


// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ChatPage = React.lazy(() => import('./Pages/Chat/ChatPage'));
const { SubMenu } = Menu
const { Content, Sider } = Layout

// const SuspendedProfile = withSuspense(ProfileContainer)


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

let NewsComponent = () => <News />

class App extends React.Component<MapPropsType & DispatchPropsType> {

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

      <Layout>
        <AppHeader />
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >

              <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
                <Menu.Item key="1">
                  <Link to='/profile'>Profile</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to='/dialogs'>Messages</Link>
                </Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                <Menu.Item key="5"><Link to='/users'>Users</Link></Menu.Item>
                <Menu.Item key="6"><Link to='/chat'>Chat</Link></Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="Others">
                <Menu.Item key="9"><Link to='/news'>News</Link></Menu.Item>
                <Menu.Item key="10"><Link to='/music'>Music</Link></Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route exact path='/'
                  render={() => <Redirect to={"/profile"} />}
                />
                <Route path='/dialogs'>
                  <Suspense fallback={<div> <Preloader /> </div>}>
                    <DialogsContainer />
                  </Suspense>
                </Route>

                <Route path='/profile/:userId?'>
                  <ProfilePage />
                </Route>

                <Route path='/users'><UsersPage title={'Users'} /></Route>

                <Route path='/news' component={NewsComponent}></Route>

                <Route path='/music' component={Music}></Route>

                <Route path='/settings' component={Settings}></Route>

                <Route path='/login' component={LoginPage}></Route>

                <Route path='/chat'>
                  <Suspense fallback={<div> <Preloader /> </div>}>
                    <ChatPage />
                  </Suspense>
                </Route>

                <Route path='*'><div>
                  Not Found
                  <Button type={'primary'}>111</Button>
                </div></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>

      // <div className='app-wrapper'>
      //   <HeaderContainer />
      //   <Nav />
      //   <Route> <FriendsContainer /> </Route>


      //   <div className='app-wrapper-content'>

      //      <Switch>
      //       <Route exact path='/'
      //         render={() => <Redirect to = {"/profile"} />}
      //       />
      //       <Route path='/dialogs'>
      //         <Suspense fallback={<div> <Preloader /> </div>}>
      //           <DialogsContainer />
      //         </Suspense>
      //       </Route>

      //       <Route path='/profile/:userId?'>
      //         <ProfilePage />
      //       </Route>

      //       <Route path='/users'><UsersPage title={'Users'} /></Route>

      //       <Route path='/news' component={NewsComponent}></Route>

      //       <Route path='/music' component={Music}></Route>
      //       <Route path='/settings' component={Settings}></Route>
      //       <Route path='/login' component={LoginPage}></Route>
      //       <Route path='*'><div>
      //         Not Found 
      //         <Button type={'primary'}>111</Button>
      //         </div></Route>
      //       </Switch>
      //   </div>
      // </div >

    )
  }
}


const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App)





