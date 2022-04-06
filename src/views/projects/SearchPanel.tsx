import { Input, Select } from "antd";
import { User } from "../../auth-provider";

interface componentProps {
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: componentProps["params"]) => void;
  users: User[];
}

export const SearchPanel = ({ params, setParams, users }: componentProps) => {
  return (
    <div>
      <Input
        value={params.name}
        onChange={(e) => {
          setParams({ ...params, name: e.target.value });
        }}
      />

      <Select
        value={params.personId}
        onChange={(value) => {
          console.log("value", value);
          setParams({ ...params, personId: value });
        }}
      >
        <Select.Option value={""}>负责人</Select.Option>
        {users.map((user, index) => {
          return (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
};
