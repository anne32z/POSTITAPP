import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import postReducer from "../Features/PostSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Redux Persist config
const persistConfig = {
  key: "reduxstore",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 1️⃣ Create the store first
export const store = configureStore({
  reducer: persistedReducer,
});

// 2️⃣ Then create the persistor
export const persistor = persistStore(store);
