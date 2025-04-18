import {createSlice} from "@reduxjs/toolkit";

const intialState={
    currentUser:null,
    error:null,
    loading:false
}

const userSlice  = createSlice({
    name:"user",
    initialState:intialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        } ,
        updateStart:(state)=>{
            state.error=null,
            state.loading=true;
        } ,
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        } ,
        updateFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteUserStart:(state)=>{    
            state.loading=true;
            state.error=null;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        },
        deleteUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signoutSuccess:(state)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        },

    }
})  

export const{signInStart,signInSuccess,signoutSuccess,signInFailure,updateFailure,updateStart,updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess}=userSlice.actions;
export default userSlice.reducer