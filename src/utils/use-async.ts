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

const defaultInitialConfig = {
  throwError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultInitialConfig
) => {
  // 设置最初始的状态
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  // 点击收藏之后，需要刷新项目列表，但是直接刷新整个页面的给用户的体验不好，retry函数的目的是在不刷新整体页面的前提下，重新请求projects接口，获取最新的数据。
  // 需要在调用runAsync时，缓存调用runAsync发送的请求，在点击收藏后再次发送该请求
  const [retry, setRetry] = useState(() => () => {});

  const config = { ...defaultInitialConfig, ...initialConfig };

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
      status: "error",
    });

  // runAsync用来触发异步请求
  const runAsync = (
    promise: Promise<D>,
    extraConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    setRetry(() => () => {
      if (extraConfig?.retry) {
        runAsync(extraConfig?.retry(), { retry: extraConfig?.retry });
      }
    });
    setState({ ...state, status: "loading" });
    return (
      promise
        .then((data) => {
          setData(data);
          return data;
        })
        // catch会消化异常，如果不再次主动抛出，外面是接收不到异常的
        .catch((error) => {
          setError(error);
          if (config.throwError) {
            return Promise.reject(error);
          }
          return error;
        })
    );
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    runAsync,
    setData,
    setError,
    retry,
    ...state,
  };
};
