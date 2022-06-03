import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { ProfileDataType } from '../../types/types';
import { profileRequests, meaningOfResultCodes } from '../../api/api';
import { AppStateType } from '../../store/store';

export const getProfileDataThunk = createAsyncThunk("profile/getProfileDataThunk", async (userId: string | undefined, {dispatch}) => {
  const data = await profileRequests.getProfileData(userId);
  dispatch(setProfileData(data));
});

export const getProfileStatusThunk = createAsyncThunk("profile/getProfileStatusThunk", async (userId: undefined | string | null, {dispatch}) => {
  const data = await profileRequests.getProfileStatus(userId);
  dispatch(setStatus(data));
});

export const updateProfileStatusThunk = createAsyncThunk(
  "profile/updateProfileStatusThunk",
  async (status: string, {dispatch, getState}) => {
    const state = getState() as AppStateType
    const data = await profileRequests.updateProfileStatus(status);
    if(data.resultCode === meaningOfResultCodes.Success) {
      dispatch(getProfileStatusThunk(state.auth.id?.toString()))
    }
  }
);

export type PostsType = {
  id: number
  text: string
}

type InitialStateType = {
  posts: Array<PostsType>;
  profileData: ProfileDataType | null;
  status: string;
  isUpdatingStatus: boolean
};

const initialState: InitialStateType = {
  posts: [],
  profileData: null,
  status: '',
  isUpdatingStatus: false
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addPost: (state: InitialStateType, action: PayloadAction<PostsType>) => {
      state.posts.push(action.payload)
    },
    setProfileData: (state: InitialStateType, action: PayloadAction<ProfileDataType>) => {
      state.profileData = action.payload
    },
    setStatus: (state: InitialStateType, action: PayloadAction<string>) => {
      state.status = action.payload
    }
  },
  extraReducers: {
    [getProfileStatusThunk.pending.type]: (state: InitialStateType) => {
      state.isUpdatingStatus = true
    },
    [getProfileStatusThunk.fulfilled.type]: (state: InitialStateType) => {
      state.isUpdatingStatus = false
    },
    [getProfileStatusThunk.rejected.type]: () => console.log('get profile status: rejected'),
  }
});


export const { addPost, setProfileData, setStatus } = profileSlice.actions;
export default profileSlice.reducer