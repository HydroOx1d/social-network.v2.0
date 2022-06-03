import React from 'react';
import ProfileStatus from './ProfileStatus';
import {connect} from 'react-redux';
import { AppStateType } from '../../../store/store';
import { updateProfileStatusThunk } from '../../../features/profile/profileSlice';

type PropsFromOutside = {
  isOwn: boolean;
}

type MapStateToPropsType = {
  status: string
}

type MapDispatchToProps = {
  updateProfileStatusThunk: (status: string) => void;
};

type PropsType = PropsFromOutside & MapStateToPropsType & MapDispatchToProps;

const ProfileStatusContainer: React.FC<PropsType> = ({isOwn, updateProfileStatusThunk, ...props}) => {
  const onUpdateStatus = (status: string) => {
    updateProfileStatusThunk(status);
  }
  
  return (
    <ProfileStatus isOwn={isOwn} onUpdateStatus={onUpdateStatus} {...props} />
  );
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    status: state.profile.status
  }
}

export default connect<
  MapStateToPropsType,
  MapDispatchToProps,
  {},
  AppStateType
>(mapStateToProps, { updateProfileStatusThunk })(ProfileStatusContainer);