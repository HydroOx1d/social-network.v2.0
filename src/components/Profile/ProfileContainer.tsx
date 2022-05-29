import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { AppStateType } from '../../store/store';
import Profile from './Profile';
import { compose } from '@reduxjs/toolkit';
import {
  PostsType,
  getProfileDataThunk,
  getProfileStatusThunk,
} from "../../features/profile/profileSlice";
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileDataType } from '../../types/types';

type MapStateToPropsType = {
  posts: Array<PostsType>;
  id: number | null
  profileData: ProfileDataType | null
};

type MapDispatchToProps = {
  getProfileDataThunk: (userId: undefined | string) => void;
  getProfileStatusThunk: (userId: undefined | string) => void;
};

export type ProfilePropsType = MapStateToPropsType & MapDispatchToProps

const ProfileContainer: React.FC<ProfilePropsType> = ({ posts, getProfileDataThunk, getProfileStatusThunk, id, ...props}) => {
  let {userId} = useParams();
  let navigate = useNavigate();

  useEffect(() => {  
    if (!userId) {
      userId = id?.toString();
      if(!userId) {
        navigate('/login');
      }
    }
    getProfileDataThunk(userId);
    getProfileStatusThunk(userId);
  }, [userId])

  return <Profile isOwn={!userId} posts={posts} {...props} />;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profile.posts,
    id: state.auth.id,
    profileData: state.profile.profileData
  };
};

export default compose(
  connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {getProfileDataThunk, getProfileStatusThunk}),
)(ProfileContainer);