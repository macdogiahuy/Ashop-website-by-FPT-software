import { StandardProps } from "../../types/common";

export function PhoneNumber({ value, prefix, ...rest }: StandardProps & { value: string; prefix: string }) {
  return (
    <span {...rest}>
      ({prefix}) {value}
    </span>
  );
}
