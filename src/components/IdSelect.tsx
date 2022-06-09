import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<
    SelectProps,
    "value" | "onChange" | "defaultOptionText" | "options"
  > {
  value: string | number | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionText?: string;
  options?: { name: string; id: number }[];
}

//
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionText, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(selectValue) => {
        //  当用户选择了默认的Option时，返回undefined
        onChange(toNumber(selectValue) || undefined);
      }}
      {...restProps}
    >
      {defaultOptionText ? (
        <Select.Option value={0}>{defaultOptionText}</Select.Option>
      ) : null}
      {options?.map((option, index) => {
        return (
          <Select.Option value={option.id} key={option.id}>
            {option.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

/*
其他类型转Number类型
Number(null)=0

Number(undefined)  NaN

Number(true)=1
Number(false)=0

Number()=0
Number("")=0
Number("  ")=0
Number("123")=123 
Number("123 123") NaN
Number("123f")  NaN

Number(123)=123 

Number({})  NaN
Number([1,2])数组项数>=2时  NaN
*/

// 0代表展示默认Option，可以根据需求替换为其他值
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
