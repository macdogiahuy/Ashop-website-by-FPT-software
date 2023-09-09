import InfiniteScroll from "react-infinite-scroll-component";
import { use2DArrayTo1DArray } from "../../../hooks/use2DArrayTo1DArray";
import { useOrderList } from "../hooks/useOrderList";

import styles from "./index.module.css";
import { Button, Empty, Input, Skeleton } from "antd";
import { Order, OrderStatus } from "../order.model";
import { SearchOutlined, ShopOutlined, WechatOutlined } from "@ant-design/icons";
import { useProduct } from "../../product/hooks/useProduct";
import { Currency } from "../../../components/Currency";
import { useTotalPayment } from "../hooks/useTotalPayment";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useHistory } from "react-router-dom";
import { StandardProps } from "../../../types/common";
import { ORDER_STATUS_MAP } from "../../../config/order";
import { DateTimeFormat } from "../../../components/DateTimeFormat";

function ProductItemSkeleton() {
  return (
    <div className={styles.product}>
      <div className={styles.left}>
        <Skeleton.Image style={{ width: 80, height: 80 }} />
        <Skeleton paragraph={{ rows: 2 }} />
      </div>
      <div className={styles.right}>
        <Skeleton.Button size="small" style={{ width: 100 }} />
      </div>
    </div>
  );
}

export function ProductItem({
  count,
  price,
  id,
  clickable,
  ...rest
}: StandardProps & { id: string; price: number; count: number; clickable: boolean }) {
  const { data: product } = useProduct(id);

  return product ? (
    <div {...rest} className={styles.product}>
      <div className={styles.left} style={clickable ? { cursor: "pointer" } : {}}>
        <img alt="logo" src={product.thumbnail} />
        <span>
          <div className={styles["product-name"]}>{product.name}</div>
          <div className={styles.count}>x{count}</div>
        </span>
      </div>
      <div className={styles.right}>
        <Currency className={styles.price} value={price * count} />
      </div>
    </div>
  ) : (
    <ProductItemSkeleton />
  );
}

export function ShopHeader({ order, children }: StandardProps & { order: Order }) {
  const history = useHistory();

  return (
    <div className={styles.header}>
      <div className={styles.shop}>
        <span className={styles["shop-name"]}>{order.shopName}</span>
        <Button size="small">
          <WechatOutlined />
          Chat
        </Button>
        <Button size="small" onClick={() => history.push(`/shop/${order.shopId}`)}>
          <ShopOutlined />
          View shop
        </Button>
      </div>
      {children}
    </div>
  );
}

export function Diviner() {
  return <div className={styles.divider} />;
}

function OrderItem({ order }: { order: Order }) {
  const totalPayment = useTotalPayment(order);
  const history = useHistory();

  return (
    <div className={styles.order}>
      <ShopHeader order={order}>
        <div className={styles.status}>{ORDER_STATUS_MAP[order.status]}</div>
      </ShopHeader>
      <Diviner />
      <div className={styles.body}>
        {order.products.map((product) => (
          <ProductItem key={product.id} {...product} onClick={() => history.push(`/orders/${order.id}`)} clickable />
        ))}
      </div>
      <Diviner />
      <div className={styles.footer}>
        <div className={styles["footer-left"]}>
          Ordered at <DateTimeFormat value={order.orderedAt} />
        </div>
        <div className={styles["footer-right"]}>
          <span>
            <span>Total payment:</span> <Currency className={styles["total-price"]} value={totalPayment} />
          </span>
          <div className={styles.actions}>
            <Button>Contact shop</Button>
            <Button type="primary">Buy again</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderItemSkeleton() {
  return (
    <div className={styles.order}>
      <div className={styles.header}>
        <Skeleton.Button size="small" style={{ width: 200 }} />
        <Skeleton.Button size="small" style={{ width: 200 }} />
      </div>
      <div className={styles.divider} />
      <ProductItemSkeleton />
      <div className={styles.divider} />
      <div className={styles.footer}>
        <Skeleton.Button style={{ width: 150 }} />
        <div className={styles.actions}>
          <Skeleton.Button style={{ width: 100 }} />
          <Skeleton.Button style={{ width: 100 }} />
        </div>
      </div>
    </div>
  );
}

function SearchBar({ onChange }: { onChange: (value: string) => void }) {
  const [text, setText] = useState("");
  const searchText = useDebounce(text, 500);

  useEffect(() => {
    onChange(searchText);
  }, [onChange, searchText]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }, []);

  return (
    <Input
      className={styles.search}
      prefix={<SearchOutlined />}
      onChange={handleChange}
      allowClear
      size="large"
      placeholder="Search your order..."
    />
  );
}

export function OrderList({ status }: { status?: OrderStatus }) {
  const [searchText, setSearchText] = useState("");
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useOrderList(status, searchText);
  const orderList = use2DArrayTo1DArray(data?.pages) ?? [];

  const fetching = isFetchingNextPage || isFetching;
  const isEmpty = !fetching && orderList.length === 0;

  return (
    <>
      <SearchBar onChange={setSearchText} />
      <InfiniteScroll
        dataLength={orderList.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={null}
        scrollableTarget={window as any}
      >
        <div className={styles.histories}>
          {!isEmpty && orderList.map((order) => <OrderItem key={order.id} order={order} />)}
          {isEmpty && (
            <div className={styles.empty}>
              <Empty />
            </div>
          )}
          {fetching && Array.from(Array(3).keys()).map((index) => <OrderItemSkeleton key={index} />)}
        </div>
      </InfiniteScroll>
    </>
  );
}
