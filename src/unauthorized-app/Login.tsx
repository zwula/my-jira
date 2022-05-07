import { useAuth } from "../context/AuthContext";
import { Button, Form, Input } from "antd";
import { RegisterOrLoginInfo } from "../auth-provider";
import styled from "@emotion/styled";
import { CssLongButton } from ".";
import { useAsync } from "../utils/use-async";

const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { runAsync, isLoading } = useAsync(undefined, { throwError: true });

  const handelSubmit = async (values: RegisterOrLoginInfo) => {
    try {
      await runAsync(login(values));
    } catch (error) {
      onError(error as Error);
    }
  };
  return (
    <Form onFinish={handelSubmit} autoComplete="off">
      <Form.Item
        // label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名！" }]}
      >
        <Input type={"text"} placeholder={"请输入用户名"} />
      </Form.Item>

      <Form.Item
        // label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码！" }]}
      >
        <Input type={"password"} placeholder={"请输入密码"} />
      </Form.Item>

      <Form.Item>
        <CssLongButton htmlType="submit" type="primary" loading={isLoading}>
          登录
        </CssLongButton>
      </Form.Item>
    </Form>
  );
};

export default Login;
