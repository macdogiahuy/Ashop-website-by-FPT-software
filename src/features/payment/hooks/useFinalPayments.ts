import { useAppSelector } from "../../../app/hooks";
import { selectPaymentCarts } from "../payment.slice";
import { useEffect, useState } from "react";

export function useFinalPayments() {
  const paymentCarts = useAppSelector(selectPaymentCarts);
  const [finalPayments, setFinalPayments] = useState({
    totalProductsPayment: 0,
    totalShippingFee: 0,
    totalPayment: 0,
  });

  useEffect(() => {
    const totalProductsPayment = paymentCarts.reduce((prev, curr) => prev + curr.totalProductsPrice, 0);
    const totalShippingFee = paymentCarts.reduce((prev, curr) => prev + curr.logistic?.price ?? 0, 0);
    const totalPayment = paymentCarts.reduce((prev, curr) => prev + curr.totalPayment, 0);
    setFinalPayments({
      totalProductsPayment,
      totalShippingFee,
      totalPayment,
    });
  }, [paymentCarts]);

  return finalPayments;
}
