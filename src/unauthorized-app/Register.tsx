import { Button, Form, Input } from "antd";
import { RegisterOrLoginInfo } from "../auth-provider";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();

  const handelSubmit = (values: RegisterOrLoginInfo) => {
    register(values);
  };
  return (
    <Form onFinish={handelSubmit} autoComplete="off">
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名！" }]}
      >
        <Input type={"text"} />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码！" }]}
      >
        <Input type={"password"} />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          注册账号
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
