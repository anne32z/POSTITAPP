import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersData } from "../Exampledata";
import axios from "axios";
import * as ENV from "../config";
//const initialState = { value: UsersData };

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//Create the thunk
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = axios.post(`${ENV.SERVER_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      const user = response.data.user;

      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/login`, {
      email: userData.email,
      password: userData.password,
    });
    const user = response.data.user;

    return user;
  } catch (error) {
    //handle the error
    const errorMessage = "Invalid credentials";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
});

export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post(`${ENV.SERVER_URL}/logout`);
  } catch (error) {}
});

export const userSlice = createSlice({
  name: "users", //name of the state
  initialState, // initial value of the state
 
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        // Clear user data or perform additional cleanup if needed
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
