import { Breadcrumb, Button, Empty, Skeleton, Steps } from "antd";
import { Link, useHistory } from "react-router-dom";
import { AppPage } from "../../components/AppPage";

import { useParams } from "react-router";
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { ORDER_STATUS_MAP } from "../../config/order";
import { Order, OrderStatus } from "../orders/order.model";
import { useOrder } from "./hooks/useOrder";

import styles from "./index.module.css";
import { DateTimeFormat } from "../../components/DateTimeFormat";
import classNames from "classnames";
import { useAddress } from "../address/hooks/useAddress";
import { PhoneNumber } from "../../components/PhoneNumber";
import { useLogistic } from "../logistic/hooks/useLogistic";
import { Diviner, ProductItem, ShopHeader } from "../orders/OrderList";
import { StandardProps } from "../../types/common";
import { Currency } from "../../components/Currency";
import { useTotalProductPrice } from "../orders/hooks/useTotalProductPrice";
import { useTotalPayment } from "../orders/hooks/useTotalPayment";
import { PAYMENT_METHODS } from "../../config/payment";

const { Step } = Steps;

const FOLLOW_MAP = {
  purchased: 1,
  shipping: 2,
  arrived: 3,
  received: 4,
};

function OrderHeader({ order }: { order: Order }) {
  const history = useHistory();

  return (
    <div className={classNames(styles.header, styles.panel)}>
      <span className={styles["header-left"]} onClick={() => history.push("/orders")}>
        <LeftOutlined style={{ marginRight: 5 }} />
        <span>Back</span>
      </span>
      <span className={styles["header-right"]}>
        <span>Order Id: {order.id}</span>
        <span className={styles.status}>{ORDER_STATUS_MAP[order.status]}</span>
      </span>
    </div>
  );
}

function OrderStatusFlow({ order, ...rest }: StandardProps & { order: Order }) {
  const getStatus = (status: OrderStatus, index: number) => {
    const current = FOLLOW_MAP[status];
    return current > index ? "finish" : current === index ? "process" : "wait";
  };

  return (
    <div {...rest} className={styles.panel}>
      <Steps>
        <Step
          status={getStatus("purchased", 1)}
          title="Purchased"
          description={<DateTimeFormat className={styles.sub} value={order.orderedAt} />}
          icon={<DollarCircleOutlined />}
        />
        <Step
          status={getStatus("shipping", 2)}
          title="Shipping"
          description={<DateTimeFormat className={styles.sub} value={order.shippedAt} />}
          icon={<CarOutlined />}
        />
        <Step
          status={getStatus("arrived", 3)}
          title="Arrived"
          description={<DateTimeFormat className={styles.sub} value={order.arrivedAt} />}
          icon={<ClockCircleOutlined />}
        />
        <Step
          status={getStatus("received", 4)}
          title="Received"
          description={<DateTimeFormat className={styles.sub} value={order.receivedAt} />}
          icon={<CheckCircleOutlined />}
        />
      </Steps>
    </div>
  );
}

function DeliveryAddress({ order }: { order: Order }) {
  const { data: address } = useAddress(order.addressId);
  const { data: logistic } = useLogistic(order.logisticId);
  return (
    <div className={styles.panel}>
      <span className={styles.title}>Delivery address</span>
      {!address && <Skeleton paragraph={{ rows: 4 }} />}
      {address && (
        <div className={styles["delivery-address"]}>
          <span style={{ fontWeight: 500 }}>{address.name}</span>
          <PhoneNumber className={styles.sub1} value={address.phone} prefix={address.phonePrefix} />
          <span className={styles.sub1}>{address.address}</span>
          <span className={styles.sub1}>
            {address.city}, {address.country}
          </span>
          <span className={styles.sub1}>
            <CarOutlined /> Shipped by:{" "}
            {!logistic ? <Skeleton.Button size="small" style={{ width: 50 }} /> : <span>{logistic.name}</span>}
          </span>
        </div>
      )}
    </div>
  );
}

function ProductDetail({ order }: { order: Order }) {
  const totalProductPrice = useTotalProductPrice(order);
  const totalPayment = useTotalPayment(order);

  return (
    <div className={styles.panel}>
      <ShopHeader order={order} />
      <Diviner />
      {order.products.map((product) => (
        <ProductItem key={product.id} {...product} clickable={false} />
      ))}
      <Diviner />
      <div className={styles.payment}>
        <label>Total product price:</label>
        <Currency value={totalProductPrice} />
        <label>Shipping fee:</label>
        <Currency value={order.shippingFee} />
        <label>Total payment:</label>
        <Currency className={styles["total-payment"]} value={totalPayment} />
        <label>Payment method:</label>
        <span>{order.paymentMethod && PAYMENT_METHODS[order.paymentMethod.type].name}</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className={classNames(styles.panel, styles.footer)}>
      <Button>Contact shop</Button>
      <Button type="primary">Buy again</Button>
    </div>
  );
}

function OrderSkeleton() {
  return <Skeleton />;
}

export function OrderPage() {
  const { id } = useParams<any>();
  const { data: order, isLoading } = useOrder(id);

  console.log(isLoading);
  return (
    <AppPage>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>

      {isLoading && <OrderSkeleton />}
      {!isLoading && !order && <Empty description="Not found" />}
      {!isLoading && order && (
        <div className={styles.container}>
          <OrderHeader order={order} />
          <OrderStatusFlow order={order} style={{ marginTop: 0 }} />
          <DeliveryAddress order={order} />
          <ProductDetail order={order} />
          <Footer />
        </div>
      )}
    </AppPage>
  );
}
