import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './appReducer';
import { ThunkAction } from 'redux-thunk';
import chatReducer from './chatReducer';


let rootReducer = combineReducers({
    profilePage: profileReducer, 
    dialogsPage: dialogsReducer, 
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    chat: chatReducer,
});

type RootReducerType = typeof rootReducer 
export type AppStateType = ReturnType<RootReducerType>

// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
// export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))


// let store = createStore(reducers, applyMiddleware(thunkMiddleware));



export default store