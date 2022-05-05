import { useEffect, useState } from "react";
// 删除对象中，属性值为 falsy 的属性 。

// 判断真假值
export const isFalsy = (value: unknown) => {
  if (value === 0) {
    return false;
  } else {
    return !value;
  }
};
// 判断是否为空值
export const isVoid = (value: unknown) => {
  return value === undefined || value === "" || value === null;
};

// object类型，既包含朴素对象，又包含函数对象，内置对象等对象类型，执行tempObject[key]操作时，可能会出现报错;
// 定义朴素对象
interface plainObject {
  [key: string]: unknown;
}
export const cleanObject = (initObject: plainObject) => {
  const tempObject = { ...initObject };
  Object.keys(tempObject).forEach((key, index) => {
    const value = tempObject[key];
    if (isVoid(value)) {
      delete tempObject[key];
    }
  });
  return tempObject;
};

// 防抖的自定义hook
// 当传入的值发生变化的时候，延迟delay后在改变
export const useDebounce = <T>(value: T, delay: number) => {
  // 需要一个debounce值
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounce;
};
