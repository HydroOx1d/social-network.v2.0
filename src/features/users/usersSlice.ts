import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { usersRequests } from '../../api/api';

export type GetUsersParamsType = {
  pageNumber: number,
  pageSize: number
}

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (params: GetUsersParamsType, {dispatch}) => {
    const data = await usersRequests.getUsers(params.pageNumber, params.pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount))
  }
);

type UserPhotosType = {
  small: string,
  large: string
}

export type UsersType = {
  id: number,
  name: string,
  uniqueUrlName: string | null,
  photos: UserPhotosType,
  status: string | null,
  followed: boolean
}

type InitialStateType = {
  users: Array<UsersType>
  pageSize: number
  totalCount: number
  defaultPageNumber: number
  isFetchingUsers: boolean
}

let initialState: InitialStateType = {
  users: [],
  pageSize: 10,
  totalCount: 0,
  defaultPageNumber: 1,
  isFetchingUsers: false
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state: InitialStateType, action: PayloadAction<Array<UsersType>>) => {
      state.users = [...action.payload];
    },
    setTotalCount: (state: InitialStateType, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
    isFetchingUsers: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.isFetchingUsers = action.payload
    }
  },
  extraReducers: {
    [getUsers.pending.type]: (state: InitialStateType) => {
      state.isFetchingUsers = true;
    },
    [getUsers.fulfilled.type]: (state: InitialStateType) => {
      state.isFetchingUsers = false;
    },
    [getUsers.rejected.type]: () => console.log("rejected"),
  },
});

export const {setUsers, setTotalCount, isFetchingUsers} = usersSlice.actions
export default usersSlice.reducer