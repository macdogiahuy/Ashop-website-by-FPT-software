import { ProductCardSkeleton } from "../../../components/ProductCardSkeleton";
import { StandardProps } from "../../../types/common";
import { use2DArrayTo1DArray } from "../../../hooks/use2DArrayTo1DArray";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductCard } from "../../../components/ProductCard";
import { useShopProducts } from "../hooks/useShopProducts";

import styles from "./index.module.css";

function FetchingProducts({ num }) {
  return (
    <>
      {Array.from(Array(num).keys()).map((index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
}

export function ShopProducts(props: StandardProps) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useShopProducts(props.shop.id);
  const products = use2DArrayTo1DArray(data?.pages) ?? [];

  return (
    <InfiniteScroll
      {...props}
      dataLength={products.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={null}
      scrollableTarget={window as any}
    >
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {(isFetchingNextPage || isFetching) && <FetchingProducts num={8} />}
      </div>
    </InfiniteScroll>
  );
}
