import styled from "@emotion/styled";
import { Typography } from "antd";
import { useMemo } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { useUrlQueryParam } from "../../utils/url";
import { useProject } from "../../utils/use-project";
import { useUsers } from "../../utils/use-users";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";

// 登录之后默认显示的页面
export const ProjectView = () => {
  // 修改当前document.title
  useDocumentTitle("项目列表", false);

  // projects接口，根据name和personId进行查询
  // 获取url中的search中的参数【默认为字符串格式】
  const [params, setParams] = useUrlQueryParam(["name", "personId"]);
  const digitalizedParams = useMemo(
    () => ({
      ...params,
      //
      personId: Number(params.personId) || undefined,
    }),
    [params]
  );

  const debounceParams = useDebounce(digitalizedParams, 500);

  const { isLoading, error, data: list } = useProject(debounceParams);
  const { data: users } = useUsers();

  // 渲染数据
  return (
    <div>
      <CssContainer>
        <h1>项目列表</h1>
        <SearchPanel
          params={digitalizedParams}
          setParams={setParams}
          users={users || []}
        />
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        <List dataSource={list || []} users={users || []} loading={isLoading} />
      </CssContainer>
    </div>
  );
};

ProjectView.whyDidYouRender = false;

const CssContainer = styled.div`
  padding: 3.2rem;
`;
