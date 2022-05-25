import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { loginThunk } from '../../features/auth/authSlice';
import { LoginValuesType } from '../../types/types';
import { AppStateType } from '../../store/store';
import { Navigate } from 'react-router-dom';

type MapStateToPropsType = {
  isAuth: boolean
}

type MapDispatchToPropsType = {
  loginThunk: (loginData: LoginValuesType) => void;
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const LoginContainer: React.FC<PropsType> = ({loginThunk, isAuth}) => {
  const onLogin = (loginData: LoginValuesType) => {
    loginThunk(loginData)
  }

  if(isAuth) {
    return <Navigate to="/profile"/>
  }

  return <Login onLogin={onLogin} />;
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {loginThunk})(LoginContainer)