import { AppPage } from "../../components/AppPage";
import { OrderList } from "./OrderList";
import { Breadcrumb, Tabs } from "antd";
import { Link } from "react-router-dom";

import styles from "./index.module.css";

export function OrdersPage() {
  return (
    <AppPage>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>

      <Tabs
        className={styles.tabs}
        items={[
          {
            label: "All",
            key: "all",
            children: <OrderList />,
          },
          {
            label: "Shipping",
            key: "shipping",
            children: <OrderList status="shipping" />,
          },
          {
            label: "Waiting for pick up",
            key: "arrived",
            children: <OrderList status="arrived" />,
          },
          {
            label: "Received",
            key: "received",
            children: <OrderList status="received" />,
          },
        ]}
      />
    </AppPage>
  );
}
