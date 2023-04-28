import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    posts: []
};
export const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers: {
        addPost : (state , action) =>{
            state.posts.push(action.payload)
        },
        editPost : () =>{

        },
        deletePost: (state,action) =>{
            state.posts = state.posts.filter(item => item.id !== action.payload.id)
        },
    },
})

export const {addPost , editPost , deletePost } = postSlice.actions

export default postSlice.reducer;
