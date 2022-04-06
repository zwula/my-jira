import { Table } from "antd";
import { User } from "../../auth-provider";

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
      ]}
      dataSource={list}
    ></Table>
  );
};
