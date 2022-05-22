import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authRequests, meaningOfResultCodes } from '../../api/api';
import { LoginValuesType } from '../../types/types';


export const getIsAuth = createAsyncThunk('auth/getIsAuth', async (_, {dispatch}) => {
  const data = await authRequests.authMe();
  
  if(data.resultCode === meaningOfResultCodes.Success) {
    dispatch(setAuthData(data.data));
  }
})

export const loginThunk = createAsyncThunk('auth/loginThunk', async (loginData: LoginValuesType, {dispatch}) => {
  const data = await authRequests.login(loginData);

  if(data.resultCode === meaningOfResultCodes.Success) {
    dispatch(getIsAuth())
  }
})

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async (_, {dispatch}) => {
  const data = await authRequests.logout();

  if(data.resultCode === meaningOfResultCodes.Success) {
    dispatch(deleteAuthData());
  }
})

type InitialStateType = {
  isAuth: boolean
  id: null | number
  email: null | string
  login: null | string
}

const initialState: InitialStateType = {
  isAuth: false,

  id: null,
  email: null,
  login: null,
}

type AuthDataActionType = {
  id: number
  login: string
  email: string
} 

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (
      state: InitialStateType,
      action: PayloadAction<AuthDataActionType>
    ) => {
      const {id, email, login} = action.payload;

      state.email = email;
      state.id = id;
      state.login = login;

      state.isAuth = true
    },
    deleteAuthData: (state: InitialStateType) => {
      state.email = null;
      state.id = null;
      state.login = null;

      state.isAuth = false
    }
  },
  extraReducers: {
    [getIsAuth.pending.type]: () => console.log("pending"),
    [getIsAuth.fulfilled.type]: () => console.log("fulfilled"),
    [getIsAuth.rejected.type]: () => console.log("rejected"),
  },
});

export const { setAuthData, deleteAuthData } = authSlice.actions;

export default authSlice.reducer