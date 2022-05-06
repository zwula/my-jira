import { useState } from "react";
// 统一管理 在发送异步请求 时，页面的loading和error状态

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  status: "idle",
};

export const useAsync = <D>(initialState?: State<D>) => {
  // 设置最初始的状态
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      error: null,
      status: "success",
    });
  const setError = (error: Error) =>
    setState({
      data: null,
      error,
      status: "success",
    });

  // runAsync用来触发异步请求
  const runAsync = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    setState({ ...state, status: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    setData,
    setError,
    runAsync,
    ...state,
  };
};
