import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { ProfileDataType } from '../../types/types';
import { profileRequests } from '../../api/api';

export const getProfileDataThunk = createAsyncThunk("profile/getProfileDataThunk", async (userId: string | undefined, {dispatch}) => {
  const data = await profileRequests.getProfileData(userId);
  dispatch(setProfileData(data));
});

export type PostsType = {
  id: number
  text: string
}

type InitialStateType = {
  posts: Array<PostsType>
  profileData: ProfileDataType | null
  // status: string
}

const initialState: InitialStateType = {
  posts: [],
  profileData: null
  // status: '',
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
    }
    // setStatus: (state: InitialStateType, action: PayloadAction<string>) => {
    //   state.status = action.payload
    // }
  }
});


export const { addPost, setProfileData } = profileSlice.actions;
export default profileSlice.reducer