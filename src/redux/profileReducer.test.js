import { profileAPI } from '../api/api';
import profileReducer, { addPostActionCreator, deletePostActionCreator } from './profileReducer';
import React, { Profiler } from 'react';

let state = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: "It's my first post", likesCount: 10 },
        { id: 3, message: "It's my second post", likesCount: 25 },
    ],
};



it('new post should be added', ()=> {
    let action = addPostActionCreator('test text');
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(4);
    
})


it('new post message equal', ()=> {
    let action = addPostActionCreator('test text2');
    let newState = profileReducer(state, action);

    expect(newState.postsData[3].message).toBe('test text2');
})


// TDD

it('after delete length should be decrement', ()=> {
    let action = deletePostActionCreator(1);
    let newState = profileReducer(state, action)

    expect(newState.postsData.length).toBe(2);
})


it(`after delete  with wrong id length shouldn't be changed `, ()=> {
    let action = deletePostActionCreator(500);
    let newState = profileReducer(state, action)

    expect(newState.postsData.length).toBe(3);
}) 