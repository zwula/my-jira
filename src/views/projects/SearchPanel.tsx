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
      <input
        type="text"
        value={params.name}
        onChange={(e) => {
          setParams({ ...params, name: e.target.value });
        }}
      />

      <select
        value={params.personId}
        onChange={(e) => {
          setParams({ ...params, personId: e.target.value });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((user, index) => {
          return (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
