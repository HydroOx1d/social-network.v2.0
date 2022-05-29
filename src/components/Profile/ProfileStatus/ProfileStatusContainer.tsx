import React from 'react';
import ProfileStatus from './ProfileStatus';
import {connect} from 'react-redux';
import { AppStateType } from '../../../store/store';

type PropsFromOutside = {
  isOwn: boolean;
}

type MapStateToPropsType = {
  status: string
}

type MapDispatchToProps = {}

type PropsType = PropsFromOutside & MapStateToPropsType & MapDispatchToProps;

const ProfileStatusContainer: React.FC<PropsType> = ({isOwn, ...props}) => {
  return <ProfileStatus isOwn={isOwn} {...props}/>
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
>(mapStateToProps)(ProfileStatusContainer);