import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { useUser } from "../../../hooks/useUser";
import { PlaceOrderInfo } from "../payment.model";
import { generateRandomSeriesNumbers } from "../../../utils/display-utils";
import { useAppDispatch } from "../../../app/hooks";
import { cleanupCarts } from "../../cart/cart.slice";
import { useQueryClient } from "@tanstack/react-query";
import { MOCK_ORDERS } from "../../../mock/orders";
import { Order, OrderStatus } from "../../orders/order.model";
import { MOCK_PRODUCTS } from "../../../mock/products";
import { MOCK_LOGISTICS } from "../../../mock/logistics";
import { MOCK_SHOPS } from "../../../mock/shops";
import ms from "ms";

async function placeOrder(userId: string, data: PlaceOrderInfo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const findProductById = (id: string) => MOCK_PRODUCTS.find((product) => product.id === id);
      const findShopByProductId = (id: string) => {
        const product = findProductById(id);
        return MOCK_SHOPS.find((shop) => shop.id === product.shopId);
      };
      const findLogisticById = (id: string) => MOCK_LOGISTICS.find((logistic) => logistic.id === id);

      const orders: Order[] = data.carts.map((cart) => {
        const shop = findShopByProductId(cart.products[0].id);
        return {
          id: generateRandomSeriesNumbers(10),
          orderedAt: new Date().toISOString(),
          addressId: data.addressId,
          paymentMethod: data.paymentMethod,
          shopId: shop.id,
          shopName: shop.name,
          products: cart.products.map((product) => ({
            id: product.id,
            price: findProductById(product.id).price,
            count: product.count,
            name: findProductById(product.id).name,
          })),
          logisticId: cart.logisticId,
          shippingFee: findLogisticById(cart.logisticId).price,
          status: "purchased",
        };
      });

      const scheduleChangeStatusTo = (status: OrderStatus, timeout, done: (order: Order) => void) => {
        setTimeout(() => {
          for (const order of orders) {
            order.status = status;
            done(order);
          }
        }, timeout);
      };

      scheduleChangeStatusTo("shipping", ms("30s"), (order) => (order.shippedAt = new Date().toISOString()));
      scheduleChangeStatusTo("arrived", ms("40s"), (order) => (order.arrivedAt = new Date().toISOString()));
      scheduleChangeStatusTo("received", ms("50s"), (order) => (order.receivedAt = new Date().toISOString()));

      MOCK_ORDERS.push(...orders);
      resolve(orders.map((order) => order.id));
    }, 1000 + Math.random() * 1000);
  });
}

export function usePlaceOrder() {
  const { data: user } = useUser();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useSimpleMutation(["placeOrder"], (data) => placeOrder(user.id, data), {
    onSuccess: async () => {
      dispatch(cleanupCarts());
      await queryClient.invalidateQueries(["orders"]);
    },
  });
}
