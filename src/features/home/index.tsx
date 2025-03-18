import { AppPage } from "../../components/AppPage";

import styles from "./index.module.css";
import { CheckoutButton } from "../../components/CheckoutButton";
import { Products } from "../products";

export function HomePage() {
  return (
    <AppPage>
      <Products className={styles["products-grid"]} />
      <CheckoutButton />
    </AppPage>
  );
}
