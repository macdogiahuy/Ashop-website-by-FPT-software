import { AppPage } from "../../components/AppPage";

import styles from "./index.module.css";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { PaymentItem } from "./PaymentItem";
import { PaymentMethod } from "./PaymentMethod";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPaymentCarts, setupPaymentCarts } from "./payment.slice";
import { useLogistics } from "../logistic/hooks/useLogistics";
import { selectCarts } from "../cart/cart.slice";
import { PlaceOrder } from "./PlaceOrder";
import { ShippingAddress } from "./ShippingAddress";
import { useUserPayment } from "./hooks/useUserPayment";

export function PaymentPage() {
  const paymentCarts = useAppSelector(selectPaymentCarts);
  const { data: logistics } = useLogistics();
  const carts = useAppSelector(selectCarts);
  const dispatch = useAppDispatch();
  const { data: userPayment } = useUserPayment();

  useEffect(() => {
    dispatch(
      setupPaymentCarts({
        carts: carts ?? [],
        logistics: logistics ?? [],
        paymentMethod: userPayment && {
          type: userPayment.lastUsed,
        },
      })
    );
  }, [carts, dispatch, logistics, userPayment]);

  return (
    <AppPage>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Payment</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles["address-bar"]} />
      <div className={styles.container}>
        <ShippingAddress />
      </div>
      <div className={styles.container}>
        <div className={styles["products-header"]}>
          <span>Product</span>
          <span>Unit Price</span>
          <span>Count</span>
          <span>Total Price</span>
        </div>
        <div>
          {paymentCarts.map((paymentCart) => (
            <PaymentItem className={styles["payment-item"]} key={paymentCart.id} paymentCart={paymentCart} />
          ))}
        </div>
      </div>
      <div className={styles.container}>
        <PaymentMethod />
      </div>
      <div className={classNames(styles.container, styles.conclusion)}>
        <PlaceOrder />
      </div>
    </AppPage>
  );
}
