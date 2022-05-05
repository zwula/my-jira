/* 
  该文件整合了未登录时，登录组件和注册组件的组件逻辑

*/

import { Button, Card, Divider } from "antd";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import styled from "@emotion/styled";

import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";

const UnauthorizedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handelToggle = () => {
    setIsRegister(!isRegister);
  };
  return (
    <CssContainer>
      <CssHeader />
      <CssBackground />
      <CssShadowCard>
        <CssTitle>{isRegister ? "请注册" : "请登录"}</CssTitle>
        <div>{isRegister ? <Register /> : <Login />}</div>
        <Divider />
        {/* <a onClick={handelToggle}>
          {isRegister ? "已经有账号了? 直接登录" : "没有账号? 注册新账号"}
        </a> */}
        <Button type={"link"} onClick={handelToggle}>
          {" "}
          {isRegister ? "已经有账号了? 直接登录" : "没有账号? 注册新账号"}
        </Button>
      </CssShadowCard>
    </CssContainer>
  );
};

// css组件
const CssContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const CssTitle = styled.h2`
  margin-bottom: 2.4rem;
  color: rgba(94, 108, 132);
`;

const CssHeader = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const CssBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const CssShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

export const CssLongButton = styled(Button)`
  width: 100%;
`;

export default UnauthorizedApp;
