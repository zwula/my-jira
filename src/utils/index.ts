import { useEffect, useRef, useState } from "react";
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

// 自定义当前组件标题, 进入当前组件自动修正标题
export const useDocumentTitle = (
  title: string,
  keepCurrentTitleOnUnmount: boolean = true
) => {
  //! 路由跳转时会出现bug吧~!!
  // 缓存旧标题，使用useDocumentTitle之前的标题,即页面刚加载时的页面标题
  // const oldTitle = document.title;

  // 路由跳转时,不会出现bug的版本~!!
  const oldTitle = useRef(document.title).current;

  // 将当前组件的标题修改为传入的标题
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepCurrentTitleOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};

export const resetRoute = () => (window.location.href = window.location.origin);

// 判断当前组件的挂载状态
export const useIsMounted = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
