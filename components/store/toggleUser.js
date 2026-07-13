import { createSlice } from "@reduxjs/toolkit";


const ToogleUser = createSlice({
    name:"userToggle",
    initialState: {showLogin:false},
    reducers:{
        toggle:( state,action)=>{
state.showLogin=action.payload

        }
    }
})

export const {toggle} = ToogleUser.actions

export default ToogleUser.reducer