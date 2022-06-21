// 定义接口返回的数据的数据类型

// projects接口返回的数据的数据类型
export interface Project {
  created: number;
  id: number;
  name: string;
  personId: number;
  organization: string;
  ownerId: number;
  pin: boolean;
}

// users接口返回的数据的数据类型
export interface User {
  id: number;
  name: string;
  token: string;
}
