import { Table, TableProps } from "antd";
import { User } from "../../auth-provider";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export interface Project {
  created: number;
  id: number;
  name: string;
  personId: number;
  organization: string;
  ownerId: number;
}

interface ComponentProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ComponentProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "项目名称",
          // dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (value, data, index) => {
            return <Link to={value.id.toString()}>{value.name}</Link>;
          },
        },
        {
          title: "负责人",
          key: "personInCharge",
          render: (value, project, index) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "部门",
          key: "organization",
          dataIndex: "organization",
        },
        {
          title: "创建时间",
          key: "created",
          render: (value, project, index) => {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
