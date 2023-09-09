import { Product } from "../product/product.model";

export interface Cart {
  product: Product;
  total: number;
  selected: boolean;
}
