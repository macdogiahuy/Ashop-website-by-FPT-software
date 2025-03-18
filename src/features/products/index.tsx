import { useProducts } from "./hooks/useProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductCard } from "../../components/ProductCard";

import { use2DArrayTo1DArray } from "../../hooks/use2DArrayTo1DArray";
import styles from "./index.module.css";
import { ProductCardSkeleton } from "../../components/ProductCardSkeleton";
import { StandardProps } from "../../types/common";

function FetchingProducts({ num }) {
  return (
    <>
      {Array.from(Array(num).keys()).map((index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
}

export function Products(props: StandardProps) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useProducts();
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
