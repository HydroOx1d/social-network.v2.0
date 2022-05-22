import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
// import sider from './SiderComponent.module.css'

import { Layout, Menu } from "antd";

import type { MenuProps } from "antd";

import {
  MessageOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={"/profile"}>Профиль</Link>, "profile", <HomeOutlined />),
  getItem(<Link to={"/messages"}>Сообщения</Link>, "messages", <MessageOutlined />),
  getItem(<Link to={"/users"}>Пользователи</Link>, "users", <UserOutlined />),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

const SiderComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {pathname} = useLocation();
  let pathnameModified = pathname.slice(1, -6);

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathnameModified]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SiderComponent;
