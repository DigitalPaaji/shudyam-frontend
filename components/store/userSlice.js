import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utile";

axios.defaults.withCredentials = true;

// Get logged-in user
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_url}/auth/verify-user`,
        {
          withCredentials: true,
        }
      );

    
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to verify user"
      );
    }
  }
);

const initialState = {
  isUser: false,
  user: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
reducers:{
  addinCart:(state)=>{
    ++state.user.cartCount
  },
  removeinCart:(state)=>{
    --state.user.cartCount
  },
   removeinCartall:(state)=>{
    state.user.cartCount=0
  }
},

  extraReducers: (builder) => {
    builder
  
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })

      // Success
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUser = true;
        state.user = action.payload;
        state.isError = false;
        state.errorMessage = "";
      })

      // Error or user not logged in
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isUser = false;
        state.user = null;
        state.isError = true;
        state.errorMessage =
          action.payload || "Unable to verify user";
      });
  },
});

export const { addinCart, removeinCart,removeinCartall } = userSlice.actions;

export default userSlice.reducer;