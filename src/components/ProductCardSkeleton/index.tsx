import { Card, Skeleton } from "antd";
import styles from "./index.module.css";

export function ProductCardSkeleton() {
  return (
    <Card style={{ width: 240, minHeight: 400 }} cover={<Skeleton.Image active />} className={styles.loading} loading />
  );
}
