// import { User } from "../auth-provider";
import { useUsers } from "../utils/use-users";
import { IdSelect } from "./IdSelect";

interface UserSelectProps extends React.ComponentProps<typeof IdSelect> {
  // users: User[];
}

export const UserSelect = (props: UserSelectProps) => {
  const { data: users } = useUsers();
  // const { users } = props;
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
