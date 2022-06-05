import React from "react";
import login from "./Login.module.css";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginValuesType } from '../../types/types';

type PropsType = {
  isError: boolean
  errorText: string

  onLogin: (loginData: LoginValuesType) => void
}

const Login: React.FC<PropsType> = ({onLogin, isError, errorText}) => {
  const onFinish = (values: LoginValuesType) => {
    onLogin(values)
  };

  return (
    <div className={login.login}>
      <Form
        name="normal_login"
        className={login.loginForm}
        initialValues={{ rememberMe: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="rememberMe" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className={login.loginFormForgot} href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={login.loginFormBtn}
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
      {isError && (
        <div className={login.loginError}>
          <div className={login.loginErrorText}>{errorText}</div>
        </div>
      )}
    </div>
  );
};

export default Login;
