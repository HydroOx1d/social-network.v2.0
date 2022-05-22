import { compose } from '@reduxjs/toolkit'
import React from 'react'
import { connect } from 'react-redux'
import HeaderP from './Header'
import { AppStateType } from '../../store/store';

type MapStateToPropsType = {
  isAuth: boolean
  login: null | string
}

type MapDispatchToProps = {

}

type PropsType = MapStateToPropsType & MapDispatchToProps

const HeaderContainer: React.FC<PropsType> = ({...props}) => {
  return <HeaderP {...props}/> 
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps)
)(HeaderContainer);