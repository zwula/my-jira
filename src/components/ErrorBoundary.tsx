import React from "react";

// 使用class声明类式组件ErrorBoundary的时候，需要传入props和state
// props: children 和 fallbackRender
// state
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  //   当子组件抛出异常 该方法会接收到该异常并调用该方法
  static getDerivedStateFromError(error: Error) {
    return {
      // 返回的值会自动 调用setState，将值和state合并
      error,
    };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
