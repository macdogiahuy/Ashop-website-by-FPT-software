import { Product } from "../../features/product/product.model";
import { Badge, Card, message } from "antd";
import CurrencyFormat from "react-currency-format";
import styles from "./index.module.css";
import { useCallback, useEffect, useRef } from "react";
import { StandardProps } from "../../types/common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart, removeFromCart, selectCarts } from "../../features/cart/cart.slice";
import { shortenNumber } from "../../utils/display-utils";
import { useHistory } from "react-router-dom";
import { Currency } from "../Currency";

export function ProductCard({ product, onClick, ...rest }: StandardProps & { product: Product }) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const carts = useAppSelector(selectCarts);
  const currentCart = carts.find((cart) => cart.product.id === product.id);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.title = product.name;
    }
  }, [product.name]);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(product);
    } else {
      history.push(`/product/${product.id}`);
    }
  }, [history, onClick, product]);

  return (
    <Card
      {...rest}
      onClick={handleClick}
      ref={containerRef}
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.name} src={product.thumbnail} />}
      actions={[
        currentCart && (
          <span
            style={{ userSelect: "none" }}
            className="anticon"
            title="Remove from cart"
            onClick={(event) => {
              dispatch(removeFromCart({ product, total: 1 }));
              event.stopPropagation();
            }}
          >
            <svg
              width={16}
              height={16}
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 122.88 104.42"
            >
              <path
                fill="currentColor"
                d="M3.66,10.84a3.71,3.71,0,0,1,0-7.42H9.11A17.25,17.25,0,0,1,18,5.77c4.92,3.11,5.79,7.56,7.05,12.59H66.73a31.57,31.57,0,0,0-.91,7.33H27.15l8.37,31.47H94.81l0-.18c.72.05,1.44.08,2.17.08a31.59,31.59,0,0,0,5.46-.48l-1.29,5.19a3.6,3.6,0,0,1-3.57,2.81H37.49c1.31,4.88,2.63,7.51,4.42,8.73,2.16,1.41,5.92,1.51,12.21,1.41H96.68a3.67,3.67,0,1,1,0,7.33H54.21c-7.79.1-12.59-.09-16.44-2.63s-6-7.14-8.08-15.31h0L17.1,16.48c0-.1,0-.1-.09-.19a6.58,6.58,0,0,0-2.82-4.23A9.64,9.64,0,0,0,9,10.84H3.66ZM97,0A25.85,25.85,0,1,1,78.74,7.57,25.83,25.83,0,0,1,97,0Zm11.43,23.91V27.8a1.67,1.67,0,0,1-1.67,1.67H87.27a1.68,1.68,0,0,1-1.68-1.67V23.91a1.68,1.68,0,0,1,1.68-1.67h19.51a1.68,1.68,0,0,1,1.67,1.67Zm3.72-13.2a21.43,21.43,0,1,0,6.27,15.15,21.38,21.38,0,0,0-6.27-15.15ZM60.9,33.43a2.61,2.61,0,0,1,5.11,0V47.6a2.6,2.6,0,0,1-5.11,0V33.43Zm-15.31,0a2.61,2.61,0,0,1,5.11,0V47.6a2.6,2.6,0,0,1-5.11,0V33.43Zm40.1,53a9,9,0,1,1-9,9,9,9,0,0,1,9-9Zm-39.56,0a9,9,0,1,1-9,9,9,9,0,0,1,9-9Z"
              />
            </svg>
          </span>
        ),
        (currentCart?.total ?? 0) < product.totalAvailable && (
          <span
            title={currentCart ? `${currentCart.total} added to cart` : "Add to cart"}
            onClick={(event) => {
              if (currentCart?.total >= product.totalAvailable) {
                message.warning({
                  content: (
                    <span>
                      <span>No more </span>
                      <strong>{product.name}</strong> <span>available!</span>
                    </span>
                  ),
                });
              } else {
                dispatch(addToCart({ product, total: 1 }));
              }
              event.stopPropagation();
            }}
          >
            <Badge count={currentCart ? currentCart.total : 0} overflowCount={9}>
              <span style={{ userSelect: "none" }} className="anticon">
                <svg
                  width={16}
                  height={16}
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 104.42"
                >
                  <path
                    fill="currentColor"
                    d="M3.66,10.84a3.71,3.71,0,0,1,0-7.42H9.11A17.25,17.25,0,0,1,18,5.77c4.92,3.11,5.79,7.56,7.05,12.59H66.73a31.57,31.57,0,0,0-.91,7.33H27.15l8.37,31.47H94.81l0-.18c.72.05,1.44.08,2.17.08a31.59,31.59,0,0,0,5.46-.48l-1.29,5.19a3.6,3.6,0,0,1-3.57,2.81H37.49c1.31,4.88,2.63,7.51,4.42,8.73,2.16,1.41,5.92,1.51,12.21,1.41H96.68a3.67,3.67,0,1,1,0,7.33H54.21c-7.79.1-12.59-.09-16.44-2.63s-6-7.14-8.08-15.31h0L17.1,16.48c0-.1,0-.1-.09-.19a6.58,6.58,0,0,0-2.82-4.23A9.64,9.64,0,0,0,9,10.84H3.66ZM97,0A25.85,25.85,0,1,1,78.74,7.57,25.83,25.83,0,0,1,97,0Zm11.43,23.91V27.8a1.67,1.67,0,0,1-1.67,1.67h-6.14v6.14A1.68,1.68,0,0,1,99,37.29H95.08a1.68,1.68,0,0,1-1.67-1.68V29.47H87.27a1.68,1.68,0,0,1-1.68-1.67V23.91a1.68,1.68,0,0,1,1.68-1.67h6.14V16.1a1.68,1.68,0,0,1,1.67-1.68H99a1.68,1.68,0,0,1,1.67,1.68v6.14h6.14a1.68,1.68,0,0,1,1.67,1.67Zm3.72-13.2a21.43,21.43,0,1,0,6.27,15.15,21.38,21.38,0,0,0-6.27-15.15ZM60.9,33.43a2.61,2.61,0,0,1,5.11,0V47.6a2.6,2.6,0,0,1-5.11,0V33.43Zm-15.31,0a2.61,2.61,0,0,1,5.11,0V47.6a2.6,2.6,0,0,1-5.11,0V33.43Zm40.1,53a9,9,0,1,1-9,9,9,9,0,0,1,9-9Zm-39.56,0a9,9,0,1,1-9,9,9,9,0,0,1,9-9Z"
                  />
                </svg>
              </span>
            </Badge>
          </span>
        ),
        product.totalAvailable === 0 && <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>Sold out</span>,
      ].filter(Boolean)}
    >
      <Card.Meta className={styles["product-meta"]} title={product.name} />
      <div className={styles.meta}>
        <span className={styles.price}>
          <Currency value={product.price} />
        </span>
        <span className={styles.sold}>{shortenNumber(product.sold)} sold</span>
      </div>
    </Card>
  );
}
