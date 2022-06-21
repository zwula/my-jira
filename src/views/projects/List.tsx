import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Collection } from "../../components/Collection";
import { useEditProject } from "../../utils/use-project";
import { Project, User } from "../../const";

interface ComponentProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ComponentProps) => {
  const { mutate, ...result } = useEditProject();
  const curry = (id: number) => {
    return (pin: boolean) => {
      mutate({ id, pin });
    };
  };
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Collection isChecked={true} disabled={true} />,
          render: (value, project) => {
            console.log("value", value);
            console.log("project", project);
            return (
              <Collection
                isChecked={project.pin}
                onCheckedChange={curry(project.id)}
              />
            );
          },
        },
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
