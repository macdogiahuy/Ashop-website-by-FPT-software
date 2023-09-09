import { StandardProps } from "../../types/common";
import moment from "moment";
import { DATETIME_FORMAT } from "../../config/datetime";

export function DateTimeFormat({ value, ...rest }: StandardProps & { value: string | undefined }) {
  return value && <span {...rest}>{moment(value).format(DATETIME_FORMAT)}</span>;
}
