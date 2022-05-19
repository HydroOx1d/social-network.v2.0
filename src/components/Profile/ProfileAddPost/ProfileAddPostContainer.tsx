import React from 'react';
import ProfileAddPost from './ProfileAddPost';
import {connect} from 'react-redux';
import {compose} from "@reduxjs/toolkit";
import { PostsType, addPost} from '../../../features/profile/profileSlice';

type MapDispatchToPropsType = {
  addPost: (postObject: PostsType) => void
}

type PropsType = MapDispatchToPropsType

const ProfileAddPostContainer: React.FC<PropsType> = ({addPost}) => {

  const onAddPost = (obj: PostsType) => {
    addPost(obj)
  }
  
  return <ProfileAddPost onAddPost={onAddPost} />;
}




export default compose(
  connect(null, {addPost})
)(ProfileAddPostContainer)