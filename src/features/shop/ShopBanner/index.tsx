import { Avatar } from "antd";
import { Shop } from "../shop.model";

import styles from "./index.module.css";

export function ShopBanner({ shop }: { shop: Shop }) {
  return (
    <div className={styles.container}>
      {shop.banner && <img className={styles.banner} src={shop.banner} />}
      <div className={styles["logo-wrapper"]}>
        <Avatar src={shop.logo} size={86} />
        <span>
          <div style={{ fontWeight: 500, fontSize: "1rem" }}>{shop.name}</div>
          {shop.address && <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>{shop.address}</span>}
        </span>
      </div>
    </div>
  );
}
