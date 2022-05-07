/* 
    在真实环境中，如果使firebase这种第三方auth服务的话，则本文件不需要开发者自己开发，可直接使用第三方的sdk
    该文件用来提供，权限管理方面访问服务器API的方法，如登录，注册，注销,
    

    jwt大致逻辑
        获取token：当用户完成注册或者登录后，后台会返回token
        携带token：当用户登录后，请求每一条数据的时候都需要携带token作为鉴权的依据


    该文件主要是为了获取登录、注册时的token字段,并对其进行存储，且只有在登录、注册后localStorage中才会有token值，当用户推出登录后token值会被消除
*/

const baseUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";

export interface User {
  id: number;
  name: string;
  token: string;
}

export const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

// { user } 是直接从返回的数据格式中，解构出来的数据
export const setToken = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export interface RegisterOrLoginInfo {
  username: string;
  password: string;
  cpassword?: string;
}
// 登录账号
export const login = (info: RegisterOrLoginInfo) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  }).then(async (response) => {
    if (response.ok) {
      return setToken(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};
// 注册账号
export const register = (info: RegisterOrLoginInfo) => {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  }).then(async (response) => {
    if (response.ok) {
      return setToken(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};
// 登出账号
export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};
