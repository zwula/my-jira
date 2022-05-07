import styled from "@emotion/styled";
import { Typography } from "antd";
import { useState } from "react";
import { useDebounce } from "../../utils";
import { useProject } from "../../utils/use-project";
import { useUsers } from "../../utils/use-users";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";

// 登录之后默认显示的页面
export const ProjectView = () => {
  // projects接口，根据name和personId进行查询
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debounceParams = useDebounce(params, 500);

  // 登录账号后，请求projects相关的接口，获取数据
  // const request = useHttpWithToken();
  // 项目列表
  // ==》 1、通过list、isLoading、error分别存储某个异步请求的idle、loading、success、error状态对应的值，并进行管理
  // 存储projects接口返回的Project[]数据
  // const [list, setList] = useState([]);
  // 控制loading、error状态
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);
  // ==》 2、 进一步的封装，集中控制某个异步请求的idle、loading、success、error状态
  // const { runAsync, isLoading, error, data: list } = useAsync<Project[]>();
  // ==》 3、 更进一步的封装，直接使用useProject来完成异步请求相关的所有逻辑
  const { isLoading, error, data: list } = useProject(debounceParams);
  const { data: users } = useUsers();

  // 用户列表
  // ==》 1、通过users管理user异步请求的idle、loading、success、error状态对应的值，并进行管理
  // const [users, setUsers] = useState([]);

  // 获取projects
  // useEffect(() => {
  // 对应上面的1
  // setIsLoading(true);
  // request("projects", { data: cleanObject(params) })
  //   .then((data) => {
  //     setList(data);
  //   })
  //   .catch((error) => {
  //     setError(error);
  //     setList([]);
  //   })
  //   .finally(() => {
  //     setIsLoading(false);
  //   });
  // 对应上面的2【统一管理某个异步请求的idle、loading、success、error状态】
  //   runAsync(request("projects", { data: cleanObject(params) }));
  // }, [debounceParams]);

  // 获取users
  // useEffect(() => {
  //   request("users").then((data) => {
  //     setUsers(data);
  //   });
  // }, []);

  // 渲染数据
  return (
    <CssContainer>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </CssContainer>
  );
};

const CssContainer = styled.div`
  padding: 3.2rem;
`;
