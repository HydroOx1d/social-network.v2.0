import { AppStateType } from '../store/store';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export function requireAuth(Component: any) {
  const requireAuthComponent = (props: any): any => {
    if(props.isAuth) return <Component {...props}/>;
    return <Navigate to="/login" />;
  }

  return connect(mapStateToProps)(requireAuthComponent);
}