/* 
    该文件的根本目的是为了设计一个包裹根组件[App组件]组件[高阶组件]
    包裹组件的作用是跨组件状态管理: 
        共享那些对于当前项目整体组件树而言是“全局”的数据,如权限验证token等,向所有被包裹的子组件(包括App根组件)传递需要传递的数据
*/

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as auth from "../auth-provider";
import { http } from "../utils/http";
import { useAsync } from "../utils/use-async";

const AuthContext = createContext<{
  user: auth.User | null;
  login: (info: auth.RegisterOrLoginInfo) => Promise<void>;
  register: (info: auth.RegisterOrLoginInfo) => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);
AuthContext.displayName = "AuthContext";

// 在组件被渲染的过程中执行一次
const initUser = async () => {
  let user = null;
  // 检验当前浏览器localStorage中是否存在token，如果存在则说明此时用户处于登录状态，需要初始化user的值
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 定义包裹组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 定义要想被包裹组件传递的数据,后续我们需要在其他组件中频繁的使用和user相关的信息，因此我们此时将与user相关的信息和操作一并定义并传递给被包裹的组件
  // const [user, setUser] = useState<auth.User | null>(null);
  const {
    data: user,
    setData: setUser,
    runAsync,
    isIdle,
    isLoading,
  } = useAsync<auth.User | null>();

  const login = (info: auth.RegisterOrLoginInfo) => {
    // auth-provider中的login完成了对token的存储
    // 这里的login需要完成对user的初始化
    return auth.login(info).then((user) => setUser(user));
  };

  const register = (info: auth.RegisterOrLoginInfo) => {
    // auth-provider中的login完成了对token的存储
    // 这里的login需要完成对user的初始化
    return auth.register(info).then((user) => setUser(user));
  };

  const logout = () => {
    // auth-provider中的login完成了对token的存储
    // 这里的login需要完成对user的初始化
    return auth.logout().then(() => setUser(null));
  };

  useEffect(() => {
    runAsync(initUser());
  }, []);

  // if (isIdle || isLoading) {
  //   return <h1>111</h1>;
  // }

  // 向被包裹的子组件传递定义好的数据
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth需要在被AuthProvider包裹的子组件中使用 ！");
  }
  return context;
};
