import { Link } from "react-router-dom";
import React from "react";
import { Product } from "../product.model";

import styles from "./index.module.css";
import { Category } from "../../category/category.model";
import { Empty } from "antd";

export function ProductDetail({ product, category }: { product: Product; category: Category }) {
  return (
    <div className={styles.detail}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.header}>Product Detail</div>
        <div className={styles.grid}>
          <label>Category:</label> <Link to={`/category/${category.id}`}>{category.name}</Link>
          {product.detail?.info &&
            product.detail?.info.map((item) => (
              <React.Fragment key={item.label}>
                <label>{item.label}:</label>
                <span>{item.value}</span>
              </React.Fragment>
            ))}
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <div className={styles.header}>Product Description</div>
        {product.detail?.description && (
          <div
            style={{ whiteSpace: "break-spaces" }}
            dangerouslySetInnerHTML={{ __html: product.detail.description }}
          />
        )}
        {!product.detail?.description && <Empty>No Description</Empty>}
      </div>
    </div>
  );
}
