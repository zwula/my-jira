// 删除对象中，属性值为 falsy 的属性 。
export const cleanObject = (initObject: object) => {
  // 浅克隆一份对象
  const tempObject = { ...initObject };
  //   判断属性值的真假值
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
