import { Layout } from "antd";
import { StandardProps } from "../../types/common";

const { Content } = Layout;

export function AppBody({ children, ...rest }: StandardProps) {
  return <Content {...rest}>{children}</Content>;
}
