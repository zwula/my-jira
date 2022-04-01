/* 
  该文件整合了登录后的组件逻辑

*/

import { useAuth } from "./context/AuthContext";

const AuthorizedApp = () => {
  const { user } = useAuth();
  return (
    <div>
      已登录，登录账号为{user?.name},token值为{user?.token}
    </div>
  );
};

export default AuthorizedApp;
