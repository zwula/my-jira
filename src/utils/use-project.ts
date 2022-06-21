import { Result } from "antd";
import { useEffect } from "react";
import { cleanObject } from ".";
import { Project } from "../const/index";
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

export const useEditProject = () => {
  const request = useHttpWithToken();
  const { runAsync, ...result } = useAsync<Project[]>();
  const mutate = (params: Partial<Project>) => {
    return runAsync(
      request(`projects/${params.id}`, { data: params, method: "Patch" })
    );
  };

  return {
    mutate,
    ...result,
  };
};
