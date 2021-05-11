import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import { Button, Row, Col } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { selectIsAuth, selectCurrentUserLogin, selectCurrentUserId } from '../../redux/authSelectors';
import { authLogout } from '../../redux/authReducer';


type PropsType = {}

const { Header } = Layout

export const AppHeader: React.FC<PropsType> = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const userId = useSelector(selectCurrentUserId)

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(authLogout())
    }
    return (
        <Header className="header">
            <div className="logo" />
            <Row>
                <Col span={18}>
                    {/* <img src='./../img/logo.png'></img> */}
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to='/users'>Users</Link></Menu.Item>
                        {/* <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item> */}
                    </Menu>
                </Col>
                <Col span={6}>
                    {isAuth ?
                        <div>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            {login} {userId} <Button onClick={logout}> Logout </Button>
                        </div>
                        : <Link to={'/login'}>
                            Login
                </Link>}
                </Col>
            </Row>
        </Header>
    )
}


