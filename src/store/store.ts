import { configureStore } from "@reduxjs/toolkit";
import profile from '../features/profile/profileSlice';
import users from "../features/users/usersSlice";
import auth from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    profile,
    users,
    auth
  }
});

export type AppStateType = ReturnType<typeof store.getState>;

export default store;