import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
import { UsersData } from "../Exampledata";
import axios from "axios";
const initialState = { 
  user:{},
  isLoading:false,
  isSuccess:false,
  isError:false,
 };
//create a thunk for "/registerUser"

export const registerUser=createAsyncThunk("users/registerUser",
  async(userData)=>{
    try{
      //sends a POST request to the server along the request body object
      const response=await axios.post("http://localhost:3001/registerUser",{
        name:userData.name,
        email:userData.email,
        password:userData.password,
      });
      console.log(response);
      const user=response.data.user;//retrieve the response from the server
      return user; //return the response from the server as payload to the thunk
    }catch(error){
      console.log(error);
    }
  }
);
//create a thunk for "/login"
export const login = createAsyncThunk("users/login", async (userData) => {

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: userData.email,
        password: userData.password,
      });
      const user = response.data.user;
      console.log(response);
      return user;
    } catch (error) {
      //handle the error
      const errorMessage = "Invalid credentials";
      alert(errorMessage);
      throw new Error(errorMessage);

    }

  });


export const userSlice = createSlice({
  name: "users", //name of the state
  initialState, // initial value of the state
  // reducers: {
  //   addUser: (state, action) => {
  //     state.value.push(action.payload);
  //   },
  //   deleteUser: (state, action) => {
  //     state.value = state.value.filter((user) => user.email !== action.payload);
  //   },
  //   updateUser: (state, action) => {
  //     state.value.map((user) => {
  //       //iterate the  array and compare the email with the email from the payload
  //       if (user.email === action.payload.email) {
  //         user.name = action.payload.name;
  //         user.password = action.payload.password;
  //       }
  //     });
  //   },
  // },
  extraReducers:(builder)=>{
    builder
    .addCase(registerUser.pending,(state)=>{
      state.isLoading=true;
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
      state.isLoading=true;
    })
    .addCase(registerUser.rejected,(state)=>{
      state.isLoading=false;
    })
    .addCase(login.pending,(state)=>{
      state.isLoading=true;
    })
    .addCase(login.fulfilled,(state,action)=>{
      //assign the payload which is the user object return from the server after authentication
      state.user=action.payload;
      state.isLoading=false;
      state.isSuccess=true;
    })
    .addCase(login.rejected,(state)=>{
      state.isLoading=false;
      state.isError=true;
    })
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
