/* 
  该文件整合了未登录时，登录组件和注册组件的组件逻辑

*/

import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const UnauthorizedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handelToogle = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div>
      <div>{isRegister ? <Login /> : <Register />}</div>
      <button onClick={handelToogle}>
        切换至{isRegister ? "注册" : "登录"}
      </button>
    </div>
  );
};

export default UnauthorizedApp;
