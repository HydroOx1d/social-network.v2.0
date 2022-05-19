import { configureStore } from "@reduxjs/toolkit";
import profile from '../features/profile/profileSlice'
import users from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    profile,
    users
  }
});

export type AppStateType = ReturnType<typeof store.getState>;

export default store;