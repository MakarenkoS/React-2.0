import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './appReducer';


let  reducers = combineReducers({
    profilePage: profileReducer, 
    dialogsPage: dialogsReducer, 
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));



// let store = createStore(reducers, applyMiddleware(thunkMiddleware));



export default store