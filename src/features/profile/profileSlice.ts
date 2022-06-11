import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { ProfileDataType,  ProfileDataPhotosType } from '../../types/types';
import { profileRequests, meaningOfResultCodes } from '../../api/api';
import { AppStateType } from "../../store/store";

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

export const updateProfileAvatarThunk = createAsyncThunk(
  "profile/updateProfileAvatarThunk", async (imageFile: string | Blob, {dispatch}) => {
    const data = await profileRequests.updateProfileAvatar(imageFile);
    if(data.resultCode === meaningOfResultCodes.Success) {
      dispatch(setAvatar(data.data.photos))
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
    },
    setAvatar: (state: InitialStateType, action: PayloadAction<ProfileDataPhotosType>) => {
      if(state.profileData !== null) { 
        state.profileData.photos = action.payload;
      };
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


export const { addPost, setProfileData, setStatus, setAvatar } = profileSlice.actions;
export default profileSlice.reducer