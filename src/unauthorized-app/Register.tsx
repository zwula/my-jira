import { Button, Form, Input } from "antd";
import { RegisterOrLoginInfo } from "../auth-provider";
import { useAuth } from "../context/AuthContext";
import { CssLongButton } from ".";
import { useAsync } from "../utils/use-async";

const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { runAsync, isLoading } = useAsync(undefined, { throwError: true });

  const handelSubmit = async ({
    cpassword,
    ...values
  }: RegisterOrLoginInfo) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      await runAsync(register(values));
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

      <Form.Item
        // label="密码"
        name="cpassword"
        rules={[{ required: true, message: "请确认密码！" }]}
      >
        <Input type={"password"} placeholder={"确认密码"} />
      </Form.Item>

      <Form.Item>
        <CssLongButton htmlType="submit" type="primary" loading={isLoading}>
          注册账号
        </CssLongButton>
      </Form.Item>
    </Form>
  );
};

export default Register;
