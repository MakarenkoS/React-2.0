import { InferActionsTypes } from './redux-store';
import { decodedTextSpanIntersectsWith } from "typescript";
import { DialogType, MessageType } from "../types/types";

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';


let initialState = {
    messagesData: [
        { id: 1, message: 'Hi', sender: 'Dimych' },
        { id: 2, message: 'Hello', sender: 'Sveta' },
        { id: 3, message: 'How are you?', sender: 'Andrew' },
        { id: 4, message: 'Bye', sender: 'Andrew' }
    ] as Array<MessageType>,
    dialogsData: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andery' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' },
    ] as Array<DialogType>,

}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: 5,
                message: action.text,
                sender: 'Dimych',
            }
            
            return {    
                ...state,
                messagesData: [...state.messagesData, newMessage],
            }
        }
        
        default:
            return state
        }
        
}

export const actions = {
    sendMessageActionCreator: (text: string) => ({ type: ADD_MESSAGE, text } as const)
}


export default dialogsReducer