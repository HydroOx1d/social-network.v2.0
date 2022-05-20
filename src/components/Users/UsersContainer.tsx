import React, { useEffect } from 'react'
import Users from './Users'
import { compose } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { getUsers, followThunk, unFollowThunk, UsersType, GetUsersParamsType } from '../../features/users/usersSlice';
import { AppStateType } from '../../store/store';

type MapDispatchToProps = {
  getUsers: (queryParamsForUsers: GetUsersParamsType) => void;
  followThunk: (userId: number) => void;
  unFollowThunk: (userId: number) => void;
};

type MapStateToProps = {
  users: Array<UsersType>
  totalCount: number
  pageSize: number
  defaultPageNumber: number
  isFetchingUsers: boolean
}

type PropsType = MapDispatchToProps & MapStateToProps

const UsersContainer: React.FC<PropsType> = ({getUsers, pageSize, defaultPageNumber, followThunk, unFollowThunk, ...props}) => {
  useEffect(() => {
    getUsers({ pageNumber: defaultPageNumber, pageSize });
  }, []);

  const onFetchUsers = (pageNumber: number) => {
    getUsers( {pageNumber, pageSize} );
  }

  const onFollow = (userId: number) => {
    followThunk( userId );
  }

  const onUnFollow = (userId: number) => {
    unFollowThunk( userId );
  }

  return <Users {...props} onFetchUsers={onFetchUsers} onFollow={onFollow} onUnFollow={onUnFollow} />;
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
  return {
    users: state.users.users,
    totalCount: state.users.totalCount,
    pageSize: state.users.pageSize,
    defaultPageNumber: state.users.defaultPageNumber,
    isFetchingUsers: state.users.isFetchingUsers
  }
}

export default compose(connect(mapStateToProps, { getUsers, followThunk, unFollowThunk}))(UsersContainer);