import { Button, Modal, Table } from "antd";
import { useMyProducts } from "../hooks/useMyProducts";
import { Shop } from "../shop.model";
import { useState } from "react";
import { Currency } from "../../../components/Currency";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDeleteProduct } from "../../my-product/hooks/useDeleteProduct";
import { Link, useHistory } from "react-router-dom";

import styles from "./index.module.css";

export function MyProducts({ shop }: { shop: Shop }) {
  const [page, setPage] = useState(1);
  const { data: result, isFetching } = useMyProducts(shop.id, page);
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const history = useHistory();

  return (
    <div>
      <div className={styles.header}>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => history.push("/my-product")}>
          Add product
        </Button>
      </div>
      <Table
        rowKey="id"
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
            render: (value, record) => <Link to={`/product/${record.id}`}>{record.name}</Link>,
          },
          {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (value, record) => <Currency value={record.price} />,
          },
          {
            title: "Sold",
            dataIndex: "sold",
            key: "sold",
          },
          {
            title: "Available",
            dataIndex: "totalAvailable",
            key: "totalAvailable",
          },
          {
            title: "Action",
            render: (value, record) => (
              <div style={{ display: "flex", gap: 10 }}>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => {
                    Modal.confirm({
                      title: "Confirm deletion",
                      content: (
                        <>
                          Are you sure you want to delete <strong>{record.name}</strong>?
                          <br />
                          <span style={{ color: "red" }}>
                            You won't be able to undo you deletion, so please think twice before confirming.
                          </span>
                        </>
                      ),
                      okText: "Delete",
                      onOk: async () => {
                        await deleteProduct({
                          id: record.id,
                          shopId: shop.id,
                          page: page,
                        });
                      },
                    });
                  }}
                />
                <Button icon={<EditOutlined />} onClick={() => history.push(`/my-product/${record.id}`)} />
              </div>
            ),
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
    </div>
  );
}
