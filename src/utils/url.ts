import { cleanObject } from ".";
import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

// 解析url中的参数的自定义hook
// 目标是返回类似{name:"111",age:"222"}的参数对象
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // setSearch用来改变url中query的参数值的方法
  const [search, setSearch] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: search.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [search]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({ ...Object.fromEntries(search), ...params });
      return setSearch(o as URLSearchParamsInit);
    },
  ] as const;
};
