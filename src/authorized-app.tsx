/* 
  该文件整合了登录后的组件逻辑

*/

import { useAuth } from "./context/AuthContext";
import { ProjectView } from "./views/projects";

const AuthorizedApp = () => {
  const { logout } = useAuth();
  const handelLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handelLogout}>注销登录</button>
      <ProjectView />
    </div>
  );
};

export default AuthorizedApp;
