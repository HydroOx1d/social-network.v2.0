import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { loginThunk, handleAuthError} from '../../features/auth/authSlice';
import { HandleErrorType, LoginValuesType } from '../../types/types';
import { AppStateType } from '../../store/store';
import { Navigate } from 'react-router-dom';

type MapStateToPropsType = {
  isAuth: boolean
  isError: boolean
  errorText: string
}

type MapDispatchToPropsType = {
  loginThunk: (loginData: LoginValuesType) => void;
  handleAuthError: (values: HandleErrorType) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const LoginContainer: React.FC<PropsType> = ({loginThunk, isAuth, ...props}) => {
  useEffect(() => {
    return () => {
      props.handleAuthError({status: false, message: ''});
    }
  }, []);

  const onLogin = (loginData: LoginValuesType) => {
    loginThunk(loginData)
  }

  if(isAuth) {
    return <Navigate to="/profile"/>
  }

  return <Login onLogin={onLogin} {...props}/>;
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    isError: state.auth.isError,
    errorText: state.auth.errorText,
  }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {loginThunk, handleAuthError})(LoginContainer)