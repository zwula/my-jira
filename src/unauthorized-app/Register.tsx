import { FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { user, register } = useAuth();

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };
  return (
    <form onSubmit={handelSubmit}>
      <div>
        <label htmlFor="username">请输入用户名：</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">请输入注册密码：</label>
        <input type="text" id="password" />
      </div>
      <button type="submit">注册账号</button>
    </form>
  );
};

export default Register;
