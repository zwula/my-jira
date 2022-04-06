import { useEffect, useState } from "react";
import { cleanObject, useDebounce } from "../../utils";
import { useHttpWithToken } from "../../utils/http";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";

// 登录之后默认显示的页面
export const ProjectView = () => {
  // 登录账号后，请求projects相关的接口，获取数据
  const request = useHttpWithToken();
  // projects接口，根据name和personId进行查询
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debounceParams = useDebounce(params, 200);

  // 获取projects
  useEffect(() => {
    request("projects", { data: cleanObject(params) }).then((data) => {
      setList(data);
    });
  }, [debounceParams]);

  // 获取users
  useEffect(() => {
    request("users").then((data) => {
      setUsers(data);
    });
  }, []);

  // 渲染数据
  return (
    <div>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
