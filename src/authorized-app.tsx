/* 
  该文件整合了登录后的组件逻辑

*/

import styled from "@emotion/styled";
import { useAuth } from "./context/AuthContext";
import { ProjectView } from "./views/projects";

const AuthorizedApp = () => {
  const { logout } = useAuth();
  const handelLogout = () => {
    logout();
  };

  return (
    <div>
      <Container>
        <PageHeader>
          <HeaderLeft>
            <h3>logo</h3>
            <h3>项目</h3>
            <h3>用户</h3>
          </HeaderLeft>
          <HeaderRight>
            <button onClick={handelLogout}>注销登录</button>
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

const PageHeader = styled.header`
  /* 定义区域名 */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div``;

const PageMain = styled.main``;

export default AuthorizedApp;
