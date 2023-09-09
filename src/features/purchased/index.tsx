import { Button, Empty, Result, Tag } from "antd";
import { AppPage } from "../../components/AppPage";
import { Link, useHistory, useLocation } from "react-router-dom";

export function PurchasedPage() {
  const history = useHistory();
  const location = useLocation<any>();
  const orderIds = location.state as string[];

  return (
    <AppPage>
      {orderIds?.length > 0 ? (
        <Result
          status="success"
          title="Successfully Purchased!"
          subTitle={
            <span>
              Order number:{" "}
              {orderIds.map((orderId) => (
                <Link key={orderId} to={`/orders/${orderId}`}>
                  <Tag>{orderId}</Tag>
                </Link>
              ))}
              <br />
              Your packages will be delivered as soon as possible.
            </span>
          }
          extra={[
            <Button
              onClick={() => {
                history.push(`/orders/${orderIds[0]}`);
              }}
              type="primary"
              key="detail"
            >
              View detail
            </Button>,
            <Button
              onClick={() => {
                history.push("/");
              }}
              key="buy"
            >
              Continue Buying
            </Button>,
          ]}
        />
      ) : (
        <Empty />
      )}
    </AppPage>
  );
}
