import { InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";

import styles from "./index.module.css";
import { StandardProps } from "../../types/common";

const CustomInputNumber = InputNumber<number>;

export function OrderCount({
  max,
  initValue,
  onChange,
  ...rest
}: StandardProps & { initValue: number; max: number; onChange: (value: number) => void }) {
  const [value, setValue] = useState(initValue);

  const handleAdd = useCallback(() => {
    setValue((prevState) => (prevState < max ? prevState + 1 : prevState));
  }, [max]);
  const handleRemove = useCallback(() => {
    setValue((prevState) => (prevState > 1 ? prevState - 1 : prevState));
  }, []);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <CustomInputNumber
      {...rest}
      value={value}
      onChange={setValue}
      className={styles["order-count"]}
      min={1}
      max={max}
      addonBefore={<MinusOutlined className={styles.action} onClick={handleRemove} />}
      addonAfter={<PlusOutlined className={styles.action} onClick={handleAdd} />}
      controls={false}
    />
  );
}
