import { Table } from "antd";
import { Shop } from "../shop.model";
import { usePurchasedProducts } from "../hooks/usePurchasedProducts";
import { useState } from "react";
import { Currency } from "../../../components/Currency";
import { DateTimeFormat } from "../../../components/DateTimeFormat";

export function PurchasedProducts({ shop }: { shop: Shop }) {
  const [page, setPage] = useState(1);
  const { data: result, isFetching } = usePurchasedProducts(shop.id, page);

  return (
    <Table
      columns={[
        {
          title: "Thumbnail",
          dataIndex: "thumbnail",
          key: "thumbnail",
          render: (value, record) => <img height={40} width={40} src={record.thumbnail} alt="thumbnail" />,
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          render: (value, record) => <Currency value={record.price} />,
        },
        {
          title: "Sold",
          dataIndex: "orderedCount",
          key: "sold",
        },
        {
          title: "Total payment",
          key: "totalPayment",
          render: (value, record) => <Currency value={record.orderedCount * record.price} />,
        },
        {
          title: "Ordered date",
          key: "orderedAt",
          render: (value, record) => <DateTimeFormat value={record.orderedAt} />,
        },
      ]}
      dataSource={result?.items}
      loading={isFetching}
      pagination={{
        total: result?.total ?? 0,
        hideOnSinglePage: true,
        pageSize: 10,
        current: page,
        onChange: setPage,
        showSizeChanger: false,
      }}
    />
  );
}
