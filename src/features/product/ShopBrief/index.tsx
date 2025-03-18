import { useShop } from "../../shop/hooks/useShop";
import { Button, Skeleton } from "antd";
import { ShopOutlined, WechatOutlined } from "@ant-design/icons";
import moment from "moment";

import styles from "./index.module.css";
import { shortenNumber } from "../../../utils/display-utils";
import { useHistory } from "react-router-dom";

export function ShopBrief({ id }: { id: string }) {
  const { data: shop } = useShop(id);
  const history = useHistory();

  return (
    <div className={styles.shop}>
      {shop && (
        <>
          <div className={styles.brief}>
            <div className={styles.logo}>
              <img src={shop.logo} alt="logo" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 500 }}>{shop.name}</div>
                <div style={{ color: "rgba(0,0,0,.4)" }}>{moment(shop.lastActive).fromNow()}</div>
              </div>
              <div>
                <Button>
                  <WechatOutlined /> <span>Chat Now</span>
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => history.push(`/shop/${id}`)}>
                  <ShopOutlined /> <span>View Shop</span>
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div>
                <label>Review:</label> <span className={styles.strong}>{shortenNumber(shop.reviewCount)}</span>
              </div>
              <div>
                <label>Products:</label> <span className={styles.strong}>{shortenNumber(shop.productCount)}</span>
              </div>
            </div>
            <div className={styles.item}>
              <div>
                <label>Response Rate:</label> <span className={styles.strong}>{shortenNumber(shop.responseRate)}</span>
              </div>
              <div>
                <label>Response Time:</label> <span className={styles.strong}>{shop.responseTime}</span>
              </div>
            </div>
            <div className={styles.item}>
              <div>
                <label>Join Date:</label> <span className={styles.strong}>{moment(shop.responseRate).fromNow()}</span>
              </div>
              <div>
                <label>Followers:</label> <span className={styles.strong}>{shortenNumber(shop.followerCount)}</span>
              </div>
            </div>
          </div>
        </>
      )}
      {!shop && <Skeleton />}
    </div>
  );
}
