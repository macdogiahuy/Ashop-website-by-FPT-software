import { Address } from "../../address/address.model";
import { PaymentCart, PaymentMethod } from "../payment.slice";
import { usePlaceOrder } from "./usePlaceOrder";
import { PlaceOrderInfo } from "../payment.model";

export function usePlaceOrderWrapper() {
  const { mutateAsync, ...rest } = usePlaceOrder();

  return {
    ...rest,
    mutateAsync: ({
      address,
      paymentCarts,
      paymentMethod,
    }: {
      address: Address;
      paymentCarts: PaymentCart[];
      paymentMethod: PaymentMethod;
    }) => {
      const data: PlaceOrderInfo = {
        addressId: address.id,
        carts: paymentCarts.map((cart) => ({
          logisticId: cart.logistic!.id,
          message: cart.message,
          products: cart.items.map((item) => ({
            id: item.product.id,
            count: item.count,
          })),
        })),
        paymentMethod,
      };
      return mutateAsync(data);
    },
  };
}
