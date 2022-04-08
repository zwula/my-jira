/* 
  该文件整合了登录后的组件逻辑

*/

import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { useAuth } from "./context/AuthContext";
import { ProjectView } from "./views/projects";

import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Dropdown, Menu } from "antd";

const AuthorizedApp = () => {
  const { logout, user } = useAuth();
  const handelLogout = () => {
    logout();
  };

  const menu = (
    <Menu>
      <Menu.Item key={"logout"}>
        <a href="" onClick={handelLogout}>
          登出
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Container>
        <PageHeader between={true}>
          <HeaderLeft marginRight={true}>
            {/* <img src={softwareLogo} alt="" /> */}
            <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
            <h2>项目</h2>
            <h2>用户</h2>
          </HeaderLeft>
          <HeaderRight>
            <Dropdown overlay={menu}>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Hi, {user?.name}
              </a>
            </Dropdown>
          </HeaderRight>
        </PageHeader>
        <PageMain>
          <ProjectView />
        </PageMain>
      </Container>
    </div>
  );
};

// grid_system
const Container = styled.div`
  display: grid;
  /* 每一行的高度 */
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const PageHeader = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const PageMain = styled.main``;

export default AuthorizedApp;
