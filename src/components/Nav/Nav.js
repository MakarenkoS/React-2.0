import React from 'react';
import classes from './Nav.module.css';
import { NavLink } from 'react-router-dom';
const Nav = () => {
  return <nav className={classes.nav}>
    <div>
      <ul>
        <li className={classes.item}><NavLink activeClassName={classes.active} to='/profile'>Profile</NavLink></li>
        <li className={classes.item}><NavLink activeClassName={classes.active} to='/dialogs'>Messages</NavLink></li>
        <li className={classes.item}><NavLink activeClassName={classes.active} to='/users'>Users</NavLink></li>
        <li className={classes.item}><NavLink activeClassName={classes.active} to='/news'>News</NavLink></li>
        <li className={classes.item}><NavLink activeClassName={classes.active} to='/music'>Music</NavLink></li>
      </ul>
      <div>
        <ul>
          <li className={`${classes.item} + ${classes.item_settings}`}>
            <NavLink to='/settings'>
              Settings
            </NavLink>
          </li>
        </ul>

      </div>
    </div>
  </nav>
}

export default Nav;