import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { useQueryClient } from "@tanstack/react-query";
import { MOCK_PRODUCTS } from "../../../mock/products";
import { Product } from "../../product/product.model";
import { v4 as uuidv4 } from "uuid";
import { useCurrentShop } from "../../shop/hooks/useCurrentShop";

async function addProduct(product: Product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      product.id = uuidv4();
      MOCK_PRODUCTS.splice(0, 0, product);
      resolve(product);
    }, 1000);
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  const { data: shop } = useCurrentShop();
  return useSimpleMutation(
    ["products"],
    (data) =>
      addProduct({
        ...data,
        shopId: shop.id,
      }),
    {
      onSettled: async (data) => {
        await queryClient.cancelQueries(["current-shop", "my-products"]);
        await queryClient.invalidateQueries(["current-shop", "my-products"]);

        await queryClient.cancelQueries(["product", data.id]);
        await queryClient.setQueryData(["product", data.id], data);
      },
    }
  );
}
