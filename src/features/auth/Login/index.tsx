import { Alert, Button, Form, Input } from "antd";
import { useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

import styles from "./index.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import shop from "../../../images/shop.png";

export function LoginPage() {
  const history = useHistory();
  const { mutate, isLoading, isSuccess, isError } = useLogin();

  const handleLogin = useCallback(
    (values) => {
      mutate(values);
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      history.push("/");
    }
  }, [isSuccess, history]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.banner}>
          <div className={styles["logo-container"]}>
            <img alt="logo" src={shop} />
            <span>A Shop</span>
          </div>
          <span className={styles.description}>A Shop is the best shopping website for lazy guys</span>
        </div>
        {isError && <Alert className={styles.alert} message="Invalid username or password" type="error" />}
        <Form initialValues={{ remember: true }} onFinish={handleLogin} autoComplete="off" disabled={isLoading}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={isLoading}>
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/register">Register</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
