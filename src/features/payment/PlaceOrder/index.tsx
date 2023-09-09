import styles from "../index.module.css";
import { Currency } from "../../../components/Currency";
import { Button, Modal } from "antd";
import React, { useCallback, useEffect } from "react";
import { useFinalPayments } from "../hooks/useFinalPayments";
import { useAppSelector } from "../../../app/hooks";
import { selectPaymentAddress, selectPaymentCarts, selectPaymentMethod, selectTotalProducts } from "../payment.slice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { usePlaceOrderWrapper } from "../hooks/usePlaceOrderWrapper";

export function PlaceOrder() {
  const { totalProductsPayment, totalPayment, totalShippingFee } = useFinalPayments();
  const totalProducts = useAppSelector(selectTotalProducts);
  const address = useAppSelector(selectPaymentAddress);
  const paymentCarts = useAppSelector(selectPaymentCarts);
  const paymentMethod = useAppSelector(selectPaymentMethod);
  const { mutateAsync: placeOrder, data: orderIds, isSuccess } = usePlaceOrderWrapper();
  const history = useHistory();

  useEffect(() => {
    if (isSuccess && orderIds) {
      history.replace("/purchased", orderIds);
    }
  }, [history, isSuccess, orderIds]);

  const handlePlaceOrder = useCallback(() => {
    Modal.confirm({
      title: "Confirm Your Purchase",
      content: (
        <>
          Are you sure you want to purchase <strong>{totalProducts}</strong> products for a total of{" "}
          <strong style={{ color: "var(--accent-color)" }}>
            <Currency value={totalPayment} />
          </strong>{" "}
          ?
        </>
      ),
      okText: "Purchase Now",
      icon: <QuestionCircleOutlined />,
      onOk: async () => {
        await placeOrder({ address, paymentCarts, paymentMethod });
      },
    });
  }, [address, paymentCarts, paymentMethod, placeOrder, totalPayment, totalProducts]);

  return (
    <>
      <div className={styles["conclusion-content"]}>
        <label>Total products price:</label> <Currency value={totalProductsPayment} />
        <label>Shipping fee:</label> <Currency value={totalShippingFee} />
        <label>Total payment:</label> <Currency className={styles.total} value={totalPayment} />
      </div>
      <div className={styles["sub-panel"]}>
        <span>Press "Place Order" means you agree to abide by the A Shop Terms.</span>
        <Button
          disabled={!address || paymentCarts.length === 0 || paymentCarts.some((cart) => !cart.logistic)}
          type="primary"
          size="large"
          style={{ minWidth: 140 }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </>
  );
}
