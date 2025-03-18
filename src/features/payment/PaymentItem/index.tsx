import React, { useEffect, useState } from "react";
import { Currency } from "../../../components/Currency";
import { Button, Input, Modal, Skeleton } from "antd";

import styles from "./index.module.css";
import classNames from "classnames";
import { useShop } from "../../shop/hooks/useShop";
import { CheckCircleOutlined, WechatOutlined } from "@ant-design/icons";
import { StandardProps } from "../../../types/common";
import { useLogistics } from "../../logistic/hooks/useLogistics";
import { PaymentCart, setLogistic } from "../payment.slice";
import { useAppDispatch } from "../../../app/hooks";

export function PaymentItem({ paymentCart, ...rest }: { paymentCart: PaymentCart } & StandardProps) {
  const { logistic, items } = paymentCart;
  const { data: logistics = [] } = useLogistics();
  const [selectingLogistic, setSelectingLogistic] = useState(logistic);
  const [showingLogisticModal, setShowingLogisticModal] = useState(false);
  const dispatch = useAppDispatch();
  const { data: shop } = useShop(paymentCart.id);
  const totalProducts = items.reduce((prev, curr) => prev + curr.count, 0);
  const totalPayment = paymentCart.totalPayment;

  useEffect(() => {
    setSelectingLogistic(logistic);
  }, [logistic]);

  return (
    <>
      <div {...rest}>
        <div className={styles.header}>
          {shop && (
            <div className={styles["header-content"]}>
              <span>{shop.name}</span>
              <Button type="link">
                <WechatOutlined /> <span>Chat now</span>
              </Button>
            </div>
          )}
          {!shop && <Skeleton.Button size="small" style={{ width: 200 }} />}
        </div>
        {items.map(({ count, totalPrice, product }) => (
          <div key={product.id} className={styles.item}>
            <div className={styles.product}>
              <img alt="thumbnail" src={product.thumbnail} />
              <span title={product.name}>{product.name}</span>
            </div>
            <Currency value={product.price} />
            <span>{count}</span>
            <Currency style={{ fontWeight: 500, textAlign: "right" }} value={totalPrice} />
          </div>
        ))}
        <div className={classNames(styles["sub-panel"], styles.footer)}>
          <div className={styles.message}>
            <label>Message:</label>
            <Input placeholder="Note for the shop..." />
          </div>
          <div className={styles.logistic}>
            {logistic && (
              <>
                <div>
                  <label>Shipping By:</label>
                  <span>{logistic.name}</span>
                  <Button
                    style={{ marginLeft: 15 }}
                    type="link"
                    size="small"
                    onClick={() => setShowingLogisticModal(true)}
                  >
                    CHANGE
                  </Button>
                </div>
                <span>
                  <Currency style={{ fontWeight: 500 }} value={logistic.price} />
                </span>
              </>
            )}
            {!logistic && <Skeleton.Button active block />}
          </div>
        </div>
        <div className={classNames(styles["sub-panel"], styles.conclusion)}>
          <label>Total price ({totalProducts} products):</label>
          <Currency value={totalPayment} />
        </div>
      </div>
      <Modal
        title="Select shipping unit"
        open={showingLogisticModal}
        onOk={() => {
          dispatch(
            setLogistic({
              id: paymentCart.id,
              logistic: selectingLogistic,
            })
          );
          setShowingLogisticModal(false);
        }}
        onCancel={() => setShowingLogisticModal(false)}
      >
        {logistics.map((item) => (
          <div
            key={item.id}
            className={styles["logistic-item"]}
            onClick={() => {
              setSelectingLogistic(item);
            }}
          >
            <span>
              <div>{item.name}</div>
              <Currency className={styles.highlight} value={item.price} />
            </span>
            {item.id === selectingLogistic?.id && (
              <CheckCircleOutlined style={{ fontSize: "18px" }} className={styles.highlight} />
            )}
          </div>
        ))}
      </Modal>
    </>
  );
}
