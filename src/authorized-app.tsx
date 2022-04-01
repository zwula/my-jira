/* 
  该文件整合了登录后的组件逻辑

*/

import { useAuth } from "./context/AuthContext";
import { ProjectView } from "./views/projects";

const AuthorizedApp = () => {
  const { user } = useAuth();
  return (
    <div>
      已登录，登录账号为{user?.name},token值为{user?.token}
      <ProjectView />
    </div>
  );
};

export default AuthorizedApp;
