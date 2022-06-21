/* @jsxImportSource @emotion/react */
import { Form, Input } from "antd";
import { UserSelect } from "../../components/UserSelect";
import { User } from "../../const";

interface componentProps {
  params: {
    name: string;
    personId: number | undefined;
  };
  setParams: (params: componentProps["params"]) => void;
  users: User[];
}

export const SearchPanel = ({ params, setParams, users }: componentProps) => {
  console.log("params", params);
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
        <UserSelect
          value={params.personId}
          onChange={(value) => {
            setParams({ ...params, personId: value });
          }}
          defaultOptionText={"负责人"}
        ></UserSelect>
        {/* <Select
          value={params.personId} // 设置默认值
          onChange={(value) => {
            setParams({ ...params, personId: value });
          }}
          options={users}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user, index) => {
            return (
              <Select.Option value={user.id} key={user.id}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select> */}
      </Form.Item>
    </Form>
  );
};
