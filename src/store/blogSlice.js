import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs:[],
}

const blogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
        createBlog:(state,action)=>{
            state.blogs.push(action.payload);
        },
        updateBlog:(state,action)=>{
            state.blogs.map((blog)=>{
                if(blog.id===action.payload.id){
                    return action.payload
                }else{
                    return blog;
                }
            });
        },
        deleteBlog:(state,action)=>{
            state.blogs.filter(blog => blog.id!==action.payload.id);
        }
    }
})

export const {createBlog,updateBlog,deleteBlog} = blogSlice.actions;

export default blogSlice.reducer