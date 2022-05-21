import React , { useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import SiderComponent from "./components/Sider/SiderComponent";
import { Layout, Breadcrumb } from "antd";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import ProfileContainer from "./components/Profile/ProfileContainer";
import Messages from "./components/Messagess/Messages";
import UsersContainer from "./components/Users/UsersContainer";
import { connect } from "react-redux";
import { getIsAuth } from './features/auth/authSlice';
import { AppStateType } from './store/store';

const { Header, Content, Footer } = Layout;

type MapDispatchToPropsType = {
  getIsAuth: () => void;
}

type PropsType = MapDispatchToPropsType

const App: React.FC<PropsType> = ({getIsAuth}) => {

  useEffect(() => {
    getIsAuth()
  }, [])

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderComponent />

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <h2 className="header__logo">Social Network</h2>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/profile/*" element={<ProfileContainer />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/users" element={<UsersContainer />} />
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

export default connect<{}, MapDispatchToPropsType, {}, AppStateType>(null, {getIsAuth})(App);
