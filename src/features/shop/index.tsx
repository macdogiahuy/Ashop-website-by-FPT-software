import { AppPage } from "../../components/AppPage";
import { Breadcrumb, Button, Empty, Form, Skeleton, Tabs } from "antd";
import { Link } from "react-router-dom";

import styles from "./index.module.css";
import { MyProducts } from "./MyProducts";
import { ShopBanner } from "./ShopBanner";
import { useCurrentShop } from "./hooks/useCurrentShop";
import { ShopInfo } from "./ShopInfo";
import { Shop } from "./shop.model";
import { PurchasedProducts } from "./PurchasedProducts";
import { ShopAbout } from "./ShopAbout";
import { useParams } from "react-router";
import { useShop } from "./hooks/useShop";
import { ShopProducts } from "./ShopProducts";

function AddShop() {
  const [form] = Form.useForm();
  return (
    <div className={styles.panel}>
      <span className={styles["create-shop-title"]}>Create your own shop</span>
      <ShopInfo form={form} onFinish={(values) => {}}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </ShopInfo>
    </div>
  );
}

function ShowShop({ shop }: { shop: Shop }) {
  return (
    <>
      <ShopBanner shop={shop} />
      <Tabs
        className={styles.tabs}
        items={[
          {
            label: "My products",
            key: "myProducts",
            children: <MyProducts shop={shop} />,
          },
          {
            label: "Purchased",
            key: "purchased",
            children: <PurchasedProducts shop={shop} />,
          },
          {
            label: "About",
            key: "about",
            children: (
              <div className={styles.panel}>
                <ShopAbout shop={shop} />
              </div>
            ),
          },
        ]}
      />
    </>
  );
}

function MyShop() {
  const { data: shop, isLoading } = useCurrentShop();
  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>My shop</Breadcrumb.Item>
      </Breadcrumb>

      {isLoading && <Skeleton />}
      {!isLoading && shop && <ShowShop shop={shop} />}
      {!isLoading && !shop && <AddShop />}
    </>
  );
}

function ViewShop({ id }: { id: string }) {
  const { data: shop, isLoading } = useShop(id);

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {shop && shop.name}
          {!shop && <Skeleton.Button size="small" style={{ width: 100 }} />}
        </Breadcrumb.Item>
      </Breadcrumb>

      {isLoading && <Skeleton />}
      {!isLoading && shop && (
        <>
          <ShopBanner shop={shop} />
          <ShopProducts shop={shop} style={{ marginTop: 24 }} />
        </>
      )}
      {!isLoading && !shop && <Empty />}
    </>
  );
}

export function ShopPage() {
  const { id } = useParams<any>();

  return (
    <AppPage>
      {id && <ViewShop id={id} />}
      {!id && <MyShop />}
    </AppPage>
  );
}
