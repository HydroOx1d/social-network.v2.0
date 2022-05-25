import React , { useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import SiderComponent from "./components/Sider/SiderComponent";
import { Layout, Breadcrumb, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import ProfileContainer from "./components/Profile/ProfileContainer";
import Messages from "./components/Messagess/Messages";
import UsersContainer from "./components/Users/UsersContainer";
import { connect } from "react-redux";
import { getIsAuth } from './features/auth/authSlice';
import { AppStateType } from './store/store';
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";

const { Content, Footer } = Layout;

type MapDispatchToPropsType = {
  getIsAuth: () => void;
}

type MapStateToPropsType = {
  initializedApp: boolean
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType;

const App: React.FC<PropsType> = ({getIsAuth, initializedApp}) => {
  useEffect(() => {
    getIsAuth()
  }, [])

  const mainLoading = (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#fff",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: "100px" }} />} />
    </div>
  );

  if(!initializedApp) {
    return mainLoading;
  }

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderComponent />

        <Layout className="site-layout">
          <HeaderContainer />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/profile">
                <Route index element={<ProfileContainer />} />
                <Route
                  path=":userId"
                  element={<ProfileContainer />}
                />
              </Route>
              <Route path="/messages" element={<Messages />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<LoginContainer />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Social Network ©2022 Created by HydroOx1d
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    initializedApp: state.auth.initializedApp
  }
}

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  {},
  AppStateType
>(mapStateToProps, { getIsAuth })(App);
