import { Layout } from "antd";
import { AppHeader } from "../AppHeader";
import { AppBody } from "../AppBody";
import { StandardProps } from "../../types/common";

import styles from "./index.module.css";
import classNames from "classnames";

export function AppPage({ children, contentClassName, ...rest }: StandardProps & { contentClassName?: string }) {
  return (
    <Layout {...rest}>
      <AppHeader />
      <AppBody style={{ marginTop: 64 }} className={classNames(contentClassName, styles.content)}>
        {children}
      </AppBody>
    </Layout>
  );
}
