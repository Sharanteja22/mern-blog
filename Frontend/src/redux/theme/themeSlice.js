import {createSlice} from '@reduxjs/toolkit';

const intialState={
    theme:'light'
};


const themeSlice=createSlice({
    name:"theme",
    initialState:intialState,
    reducers:{
        toggleTheme:(state)=>{
            state.theme=state.theme==='dark'?'light':'dark';
        }
    }
});

export const {toggleTheme}=themeSlice.actions;

export default themeSlice.reducer;