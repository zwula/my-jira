import { useAuth } from "../context/AuthContext";
import { Button, Form, Input } from "antd";
import { RegisterOrLoginInfo } from "../auth-provider";

const Login = () => {
  const { login } = useAuth();

  const handelSubmit = (values: RegisterOrLoginInfo) => {
    login(values);
  };
  return (
    <Form onFinish={handelSubmit} autoComplete="off">
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名！" }]}
      >
        <Input type={"text"} placeholder={"请输入用户名"} />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码！" }]}
      >
        <Input type={"password"} placeholder={"请输入密码"} />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
