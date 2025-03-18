import CurrencyFormat from "react-currency-format";
import React from "react";
import { StandardProps } from "../../types/common";

export function Currency({ value, ...rest }: StandardProps & { value: number }) {
  return isFinite(value) ? (
    <CurrencyFormat {...rest} thousandSeparator={true} prefix={"$"} displayType="text" value={value} />
  ) : (
    <span>--</span>
  );
}
