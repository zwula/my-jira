/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";
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
    <Form layout="inline" css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          value={params.name}
          placeholder="搜索项目名"
          onChange={(e) => {
            setParams({ ...params, name: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
    </Form>
  );
};
