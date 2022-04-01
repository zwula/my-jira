import { User } from "../../auth-provider";

interface ProjectList {
  created: number;
  id: number;
  name: string;
  personId: number;
  organization: string;
  ownerId: number;
}

interface ComponentProps {
  list: ProjectList[];
  users: User[];
}

export const List = ({ list, users }: ComponentProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                {users.find((user) => user.id === item.personId)?.name ||
                  "未知"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
