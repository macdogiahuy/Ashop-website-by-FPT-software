import { useUserPayment } from "../hooks/useUserPayment";
import { Segmented, Skeleton } from "antd";
import { useCallback, useMemo } from "react";
import { SegmentedLabeledOption } from "antd/lib/segmented";

import styles from "./index.module.css";
import { CreditPayment } from "./CreditPayment";
import { CreditPaymentMethod } from "../payment.model";
import { CODPayment } from "./CODPayment";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectPaymentMethod, setPaymentMethod } from "../payment.slice";
import { PAYMENT_METHODS } from "../../../config/payment";

export function PaymentMethod() {
  const dispatch = useAppDispatch();
  const { data: payment } = useUserPayment();
  const paymentMethod = useAppSelector(selectPaymentMethod);

  const types = useMemo<SegmentedLabeledOption[]>(
    () =>
      (payment?.methods ?? []).map((method) => ({
        label: PAYMENT_METHODS[method.type].name,
        icon: PAYMENT_METHODS[method.type].icon,
        value: method.type,
      })),
    [payment?.methods]
  );

  const credit = useMemo<CreditPaymentMethod>(
    () => (payment?.methods ?? []).find((method) => method.type === "credit") as CreditPaymentMethod,
    [payment?.methods]
  );

  const handleTabChange = useCallback(
    (tab: string) => {
      dispatch(
        setPaymentMethod({
          type: tab,
          meta: tab === "credit" && credit?.cards ? credit.cards[0]?.id : null,
        })
      );
    },
    [credit?.cards, dispatch]
  );

  const loaded = paymentMethod && payment;

  return (
    <>
      <div className={styles.header}>Payment Method</div>
      {loaded && (
        <>
          <Segmented options={types} value={paymentMethod?.type} onChange={handleTabChange} className={styles.tab} />
          <div>
            {paymentMethod?.type === "credit" && <CreditPayment credit={credit} />}
            {paymentMethod?.type === "cod" && <CODPayment />}
          </div>
        </>
      )}
      {!loaded && (
        <>
          <Skeleton.Button size="small" style={{ marginBottom: 24, width: 250 }} />
          <Skeleton />
        </>
      )}
    </>
  );
}
