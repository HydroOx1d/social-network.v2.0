import React from 'react'
import { connect } from 'react-redux';
import { AppStateType } from '../../store/store';
import Profile from './Profile';
import { compose } from '@reduxjs/toolkit';
import { PostsType } from '../../features/profile/profileSlice';

type MapStateToPropsType = {
  posts: Array<PostsType>;
};

export type ProfilePropsType = MapStateToPropsType

const ProfileContainer: React.FC<ProfilePropsType> = ({ posts }) => {
  return <Profile posts={posts} />;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profile.posts,
  };
};

export default compose(
  connect(mapStateToProps)
)(ProfileContainer);