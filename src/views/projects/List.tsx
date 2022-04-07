import { Table } from "antd";
import { User } from "../../auth-provider";
import dayjs from "dayjs";

interface Project {
  created: number;
  id: number;
  name: string;
  personId: number;
  organization: string;
  ownerId: number;
}

interface ComponentProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ComponentProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "项目名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
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
          dataIndex: "organization",
        },
        {
          title: "创建时间",
          // dataIndex: "created",
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
      dataSource={list}
    ></Table>
  );
};
