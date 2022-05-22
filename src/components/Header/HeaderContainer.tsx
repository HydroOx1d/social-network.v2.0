import { compose } from '@reduxjs/toolkit'
import React from 'react'
import { connect } from 'react-redux'
import HeaderP from './Header'
import { AppStateType } from '../../store/store';
import { logoutThunk } from '../../features/auth/authSlice';

type MapStateToPropsType = {
  isAuth: boolean
  login: null | string
}

type MapDispatchToProps = {
  logoutThunk: () => void
};

type PropsType = MapStateToPropsType & MapDispatchToProps

const HeaderContainer: React.FC<PropsType> = ({logoutThunk,...props}) => {
  const onLogout = () => {
    logoutThunk()
  }

  return <HeaderP {...props} onLogout={onLogout} />; 
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {logoutThunk})
)(HeaderContainer);