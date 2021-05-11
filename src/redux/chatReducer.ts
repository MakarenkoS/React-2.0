import { chatAPI, ChatMessageType, StatusType } from './../api/chat-api';
import { UsersType } from '../types/types';
import { authMe } from './authReducer';
import { AppStateType, InferActionsTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import {v1} from 'uuid'

const MESSAGES_RECEVIED = 'chat/MESSAGES_RECEVIED'
const STATUS_CHANGED = 'chat/STATUS_CHANGED'

type ChatMessageTypeId = ChatMessageType & {id: string}

let initialState = {
    messages: [] as ChatMessageTypeId[],
    status: 'pending' as StatusType
}

export type InitialStateType = typeof initialState

type ActionType = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEVIED: {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }) )]
                    .filter( (m, index, array) =>  index >= array.length - 100)
            }
        }
        case STATUS_CHANGED: {
            return {
                ...state,
                status: action.payload.status
            }
        }

        default:
            return state
    }
}

export const actions = {
    messagesRecevied: (messages: ChatMessageType[]) => ({
        type: MESSAGES_RECEVIED, payload: { messages }
    } as const),
    statusChanged: (status: StatusType) => ({
        type: STATUS_CHANGED, payload: { status }
    } as const)
}


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>


let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecevied(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer;