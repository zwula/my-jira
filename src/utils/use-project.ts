import { useEffect } from "react";
import { cleanObject } from ".";
import { Project } from "../views/projects/List";
import { useHttpWithToken } from "./http";
import { useAsync } from "./use-async";

export const useProject = (params?: Partial<Project>) => {
  const request = useHttpWithToken();
  const { runAsync, ...results } = useAsync<Project[]>();
  useEffect(() => {
    runAsync(request("projects", { data: cleanObject(params || {}) }));
  }, [params]);

  return results;
};
