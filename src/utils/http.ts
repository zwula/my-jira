import { useAuth } from "./../context/AuthContext";
/* 
封装fetch方法，使其可以满足jwt的使用

*/
import * as auth from "../auth-provider";

import qs from "qs";

const baseUrl = process.env.REACT_APP_API_URL;

interface customConfig extends RequestInit {
  token?: string;
  data?: object;
}
// 封装fetch方法
export const http = (
  endpoint: string,
  { token, data, headers, ...customConfig }: customConfig
) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": data ? "application/json" : "",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data);
  }

  return fetch(`${baseUrl}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      // 重新登录
      auth.logout();
      window.location.reload();
      console.log("为什么会重新登录呀");
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

// 封装一个可以自动携带token的请求方法【该方法在被AuthProvider包裹的子组件中使用，因此可以使用useAuth】
export const useHttpWithToken = () => {
  const { user } = useAuth();
  // 使用该自定义hook的时候，肯定是已登录的状态，因此可以使用AuthProvider中传递过来的user中的token字段
  return (endpoint: string, customConfig?: customConfig) => {
    // 组装请求配置
    return http(endpoint, { ...customConfig, token: user?.token });
  };
};
