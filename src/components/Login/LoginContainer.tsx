import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { loginThunk } from '../../features/auth/authSlice';
import { LoginValuesType } from '../../types/types';
import { AppStateType } from '../../store/store';

type MapStateToPropsType = {

}

type MapDispatchToPropsType = {
  loginThunk: (loginData: LoginValuesType) => void;
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const LoginContainer: React.FC<PropsType> = ({loginThunk}) => {
  const onLogin = (loginData: LoginValuesType) => {
    loginThunk(loginData)
  }

  return <Login onLogin={onLogin} />;
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(null, {loginThunk})(LoginContainer)