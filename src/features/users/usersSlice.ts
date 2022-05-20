import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { usersRequests, meaningOfResultCodes} from '../../api/api';


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

export const followThunk = createAsyncThunk('users/follow', async (userId: number, {dispatch}) => {
  dispatch(isFollowing({id: userId, status: true}));

  const data = await usersRequests.follow(userId)

  if(data.resultCode === meaningOfResultCodes.Success) {
    dispatch(follow(userId))
    dispatch(isFollowing({id: userId, status: false}));
  }
})

export const unFollowThunk = createAsyncThunk('users/unFollow', async (userId: number, {dispatch}) => {
  dispatch(isFollowing({id: userId, status: true}))

  const data = await usersRequests.unFollow(userId)

  if(data.resultCode === meaningOfResultCodes.Success) {
    dispatch(unFollow(userId))
    dispatch(isFollowing({id: userId, status: false}));
  }
})

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
  isFollowingArray: Array<number>
}

export type IsFollowingType = {
  id: number
  status: boolean
}

let initialState: InitialStateType = {
  users: [],
  pageSize: 10,
  totalCount: 0,
  defaultPageNumber: 1,
  isFetchingUsers: false,
  isFollowingArray: []
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
    },
    follow: (state: InitialStateType, action: PayloadAction<number>) => {
      state.users = state.users.map(user => {
        if(user.id === action.payload) {
          user.followed = true
        }
        return user
      })
    },
    unFollow: (state: InitialStateType, action: PayloadAction<number>) => {
      state.users = state.users.map(user => {
        if(user.id === action.payload) {
          user.followed = false
        }
        return user
      })
    },
    isFollowing: (state: InitialStateType, action: PayloadAction<IsFollowingType>) => {
      if(action.payload.status === true) {
        state.isFollowingArray.push(action.payload.id)
      } else {
        state.isFollowingArray = state.isFollowingArray.filter(id => id !== action.payload.id)
      }
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

    [followThunk.pending.type]: () => console.log('following'),
    [followThunk.fulfilled.type]: () => console.log('followed'),
    [followThunk.rejected.type]: () => console.log('non-followed'),
  },
});

export const {
  setUsers,
  setTotalCount,
  isFetchingUsers,
  follow,
  unFollow,
  isFollowing,
} = usersSlice.actions;
export default usersSlice.reducer