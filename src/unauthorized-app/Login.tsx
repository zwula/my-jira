import { FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login } = useAuth();

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    //   获取文本框输入的内容
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <form onSubmit={handelSubmit}>
      {user ? <div>username:{user.name}</div> : ""}
      <div>
        <label htmlFor="username">请输入用户名：</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">请输入登录密码：</label>
        <input type="text" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};

export default Login;
