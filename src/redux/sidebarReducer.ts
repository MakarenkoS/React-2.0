import { FriendsDataType } from './../types/types';


let initialState = {
    friendsData: [
        { id: 1, name: 'Dimych', image: "Dimych_ava.jpg" },
        { id: 2, name: 'Andrey', image: "Andrey_ava.jpg" },
        { id: 3, name: 'Sveta', image: "Sveta_ava.jpg" },
    ] as Array<FriendsDataType>
}

type InitialStateType = typeof initialState


const sidebarReducer = (state = initialState, action: any): InitialStateType => {

    return state
}

export default sidebarReducer