import ImageGallery from "react-image-gallery";
import { useParams } from "react-router";
import { useProduct } from "./hooks/useProduct";
import { Breadcrumb, Button, Rate, Skeleton } from "antd";
import { AppPage } from "../../components/AppPage";
import { useCategories } from "../category/hooks/useCategories";
import { useCallback, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import styles from "./index.module.css";
import { shortenNumber } from "../../utils/display-utils";
import { ShopBrief } from "./ShopBrief";
import { ProductDetail } from "./ProductDetail";
import { useAppDispatch } from "../../app/hooks";
import { addToCart, buyNow } from "../cart/cart.slice";
import { OrderCount } from "../../components/OrderCount";
import { Currency } from "../../components/Currency";

function Loading() {
  return (
    <div className={styles.loading}>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Skeleton.Button size="small" />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Skeleton.Button size="small" />
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.briefing}>
        <Skeleton.Image className={styles.gallery} active />
        <div className={styles["brief-info"]}>
          <Skeleton paragraph={{ rows: 8 }} active />
          <div className={styles.actions}>
            <Skeleton.Button active size="large" />
            <Skeleton.Button active size="large" />
          </div>
        </div>
      </div>
      <div style={{ background: "white", padding: 24, marginTop: 24 }}>
        <Skeleton paragraph={{ rows: 2 }} />
      </div>
      <div style={{ background: "white", padding: 24, marginTop: 24 }}>
        <Skeleton paragraph={{ rows: 12 }} />
      </div>
    </div>
  );
}

export function ProductPage() {
  const { id } = useParams<any>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { data: product } = useProduct(id);
  const { data: categories } = useCategories();
  const [orderCount, setOrderCount] = useState(1);
  const category = useMemo(() => categories?.find((item) => item.id === product?.category), [product, categories]);

  const handleAddToCart = useCallback(() => {
    if (orderCount > 0) {
      dispatch(
        addToCart({
          product: product,
          total: orderCount,
        })
      );
    }
  }, [dispatch, orderCount, product]);

  const handleBuyNow = useCallback(() => {
    if (orderCount > 0) {
      dispatch(
        buyNow({
          product: product,
          total: orderCount,
        })
      );
      history.push("/cart");
    }
  }, [dispatch, history, orderCount, product]);

  const images = product
    ? (product.images ?? [{ original: product.thumbnail }]).map((image) => ({
        original: image.original,
        thumbnail: image.thumbnail ?? image.original,
        originalWidth: 450,
      }))
    : [];

  return (
    <AppPage>
      {(!product || !category) && <Loading />}
      {product && category && (
        <>
          <div>
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/category/${product.category}`}>{category.name}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.briefing}>
              <div className={styles.gallery}>
                <ImageGallery items={images} />
              </div>
              <div className={styles["brief-info"]}>
                <div className={styles["product-name"]}>{product.name}</div>
                <div className={styles["more-info"]}>
                  <span>
                    <span style={{ color: "#d2b110" }} className={styles.strong}>
                      {product.rate}
                    </span>{" "}
                    <Rate disabled allowHalf value={product.rate} />
                  </span>
                  <span>
                    <span className={styles.strong}>{shortenNumber(product.reviewCount)}</span> review
                  </span>
                  <span>
                    <span className={styles.strong}>{shortenNumber(product.sold)}</span> sold
                  </span>
                </div>
                <div className={styles.price}>
                  <Currency value={product.price} />
                </div>
                <div className={styles["order-count"]}>
                  <span className={styles.strong}>Order count:</span>
                  <OrderCount initValue={orderCount} onChange={setOrderCount} max={product.totalAvailable} />{" "}
                  <span>{product.totalAvailable} products available</span>
                </div>
                {product.totalAvailable > 0 && (
                  <div className={styles.actions}>
                    <Button size="large" onClick={handleAddToCart}>
                      <span className="anticon">
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
                      <span>Add To Cart</span>
                    </Button>
                    <Button type="primary" size="large" onClick={handleBuyNow}>
                      Buy Now
                    </Button>
                  </div>
                )}
                {product.totalAvailable === 0 && (
                  <div className={styles["sold-out"]}>
                    <span>Sold out!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <ShopBrief id={product.shopId} />
          </div>
          <div>
            <ProductDetail product={product} category={category} />
          </div>
        </>
      )}
    </AppPage>
  );
}
