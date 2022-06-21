import { useEffect } from "react";
import { User } from "../const";
import { useHttpWithToken } from "./http";
import { useAsync } from "./use-async";

export const useUsers = () => {
  const request = useHttpWithToken();
  const { runAsync, ...results } = useAsync<User[]>();
  useEffect(() => {
    runAsync(request("users"));
  }, []);

  return results;
};
