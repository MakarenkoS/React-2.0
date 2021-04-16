import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';

let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: 1, message: 'Hi, how are you?', likesCount: 15 },
                { id: 2, message: "It's my first post", likesCount: 10 },
                { id: 3, message: "It's my second post", likesCount: 25 },
            ],

            newPostText: 'Hello',
            
        },

        dialogsPage: {
            messagesData: [
                { id: 1, message: 'Hi', sender: 'Dimych' },
                { id: 2, message: 'Hello', sender: 'Sveta' },
                { id: 3, message: 'How are you?', sender: 'Andrew' },
                { id: 4, message: 'Bye', sender: 'Andrew' }
            ],
            dialogsData: [
                { id: 1, name: 'Dimych' },
                { id: 2, name: 'Andery' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'sasha' },
                { id: 5, name: 'Viktor' },
                { id: 6, name: 'Valera' },
            ],

            newMessageText: 'Hey',

        },

        sidebarPage: {
            friendsData: [
                { id: 1, name: 'Dimych', image: "Dimych_ava.jpg" },
                { id: 2, name: 'Andrey', image: "Andrey_ava.jpg" },
                { id: 3, name: 'Sveta', image: "Sveta_ava.jpg" },
            ]
        }
    },

    getState() {
        return this._state
    },

    _rerenderEntireTree() {
        console.log('changed');
    },

    dispatch(action) {
       this._state.profilePage = profileReducer(this._state.profilePage, action);
       this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
       this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);

       this._rerenderEntireTree(this._state)
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._rerenderEntireTree = observer;
    }
}




export default store;


