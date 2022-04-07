/* 
  该文件整合了登录后的组件逻辑

*/

import styled from "@emotion/styled";
import { Row } from "./components/lib";
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
        <PageHeader between={true}>
          <HeaderLeft marginRight={true}>
            <h2>logo</h2>
            <h2>项目</h2>
            <h2>用户</h2>
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

const PageHeader = styled(Row)``;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const PageMain = styled.main``;

export default AuthorizedApp;
