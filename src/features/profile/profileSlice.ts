import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

export type PostsType = {
  id: number
  text: string
}

type InitialStateType = {
  posts: Array<PostsType>
  // status: string
}

const initialState: InitialStateType = {
  posts: [],
  // status: '',
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addPost: (state: InitialStateType, action: PayloadAction<PostsType>) => {
      state.posts.push(action.payload)
    },
    // setStatus: (state: InitialStateType, action: PayloadAction<string>) => {
    //   state.status = action.payload
    // }
  }
});


export const {addPost} = profileSlice.actions
export default profileSlice.reducer