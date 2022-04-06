/* 
  该文件整合了未登录时，登录组件和注册组件的组件逻辑

*/

import { Card } from "antd";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const UnauthorizedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handelToggle = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card>
        <div>{isRegister ? <Register /> : <Login />}</div>
        <button onClick={handelToggle}>
          切换至{isRegister ? "登录" : "注册"}
        </button>
      </Card>
    </div>
  );
};

export default UnauthorizedApp;
