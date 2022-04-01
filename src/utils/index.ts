import { useEffect, useState } from "react";
// 删除对象中，属性值为 falsy 的属性 。
export const cleanObject = (initObject: object) => {
  const tempObject = { ...initObject };
  Object.keys(tempObject).forEach((key, index) => {
    // @ts-ignore  忽视隐式具有any类型的检测
    const value = tempObject[key];
    if (isFalsy(value)) {
      // @ts-ignore  忽视隐式具有any类型的检测
      delete tempObject[key];
    }
  });
  return tempObject;
};

// 判断真假值
export const isFalsy = (value: unknown) => {
  if (value === 0) {
    return false;
  } else {
    return !value;
  }
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
