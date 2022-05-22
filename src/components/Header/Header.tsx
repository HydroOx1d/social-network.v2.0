import React from 'react';
import header from './Header.module.css';
import { Layout, Avatar, Dropdown, Space, Menu} from 'antd';
import { UserOutlined, DownOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const {Header} = Layout

const menu = (
  <Menu
    items={[
      {
        label: (
          <span>Logout</span>
        ),
        key: "0",
      },
      // {
      //   label: (
      //     <a
      //       target="_blank"
      //       rel="noopener noreferrer"
      //       href="https://www.aliyun.com"
      //     >
      //       2nd menu item
      //     </a>
      //   ),
      //   key: "1",
      // },

      // {
      //   type: "divider",
      // },
    ]}
  />
);

type PropsType = {
  isAuth: boolean
  login: string | null
}

const HeaderP: React.FC<PropsType> = ({isAuth, login}) => {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className={header.headerBody}>
        <h2 className={header.headerLogo}>Social Network</h2>

        {isAuth ? (
          <div className={header.headerLogin}>
            <Avatar className={header.headerAvatar} icon={<UserOutlined />} />
            <Dropdown overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {login}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        ) : (
          <NavLink className={header.loginLink} to={'/login'}>Login</NavLink>
        )}
      </div>
    </Header>
  );
}

export default HeaderP