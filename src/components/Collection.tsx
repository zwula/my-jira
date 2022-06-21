// 借用antd中的Rate组件实现点击星星切换收藏

import { Rate } from "antd";

interface CollectionProps extends React.ComponentProps<typeof Rate> {
  isChecked: boolean;
  onCheckedChange?: (isChecked: boolean) => void;
}

export const Collection = (props: CollectionProps) => {
  const { isChecked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={Number(isChecked)}
      onChange={(value) => {
        onCheckedChange?.(!!value);
      }}
      {...restProps}
    />
  );
};
