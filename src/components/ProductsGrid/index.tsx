import { Product } from "../../features/product/product.model";

import styles from "./index.module.css";
import { ProductCard } from "../ProductCard";
import { StandardProps } from "../../types/common";

export function ProductsGrid({
  products,
  onClick,
  ...rest
}: StandardProps & { products: Product[]; onClick?: (product: Product) => void }) {
  return (
    <div {...rest} className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => {
            if (onClick) {
              onClick(product);
            }
          }}
        />
      ))}
    </div>
  );
}
