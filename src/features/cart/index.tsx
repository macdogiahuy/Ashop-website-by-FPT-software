import { Affix, Breadcrumb, Button, Checkbox, Modal, Popconfirm, Table } from "antd";
import { Link, useHistory } from "react-router-dom";
import { AppPage } from "../../components/AppPage";

import styles from "./index.module.css";
import { ColumnsType } from "antd/lib/table/interface";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { chooseCarts, clearCart, selectCarts, updateCart } from "./cart.slice";
import React, { useCallback, useState } from "react";
import { OrderCount } from "../../components/OrderCount";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Currency } from "../../components/Currency";
import { useSelectedCarts } from "./hooks/useSelectedCarts";
import { useFlattenCarts } from "./hooks/useFlattenCarts";
import { useTotalPayment } from "./hooks/useTotalPayment";

interface FlattenCart {
  key: React.Key;
  productName: string;
  productThumbnail: string;
  productId: string;
  totalProducts: number;
  unitPrice: number;
  totalPrice: number;
  count: number;
}

const CustomTable = Table<FlattenCart>;
export function CartPage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const carts = useAppSelector(selectCarts);
  const [affixing, setAffixing] = useState(false);

  const selectedKeys = useSelectedCarts();
  const renderCarts = useFlattenCarts();
  const totalPayment = useTotalPayment();

  const handleSelectAll = useCallback(
    (event) => {
      if (event.target.checked) {
        dispatch(chooseCarts(carts.map((cart) => cart.product.id)));
      } else {
        dispatch(chooseCarts([]));
      }
    },
    [carts, dispatch]
  );

  const handleDeleteAll = useCallback(() => {
    Modal.confirm({
      title: `Are you sure delete ${selectedKeys.length} products?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(clearCart());
      },
    });
  }, [dispatch, selectedKeys.length]);

  const handleBuy = useCallback(() => {
    history.push("/payment");
  }, [history]);

  const columns: ColumnsType<FlattenCart> = [
    {
      key: "product",
      dataIndex: "productName",
      title: "Product",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <img style={{ width: 80, height: 80, marginRight: 10 }} alt="thumbnail" src={record.productThumbnail} />
          <span
            onClick={() => history.push(`/product/${record.productId}`)}
            style={{ maxWidth: 300, fontSize: "1rem", cursor: "pointer" }}
          >
            {record.productName}
          </span>
        </div>
      ),
    },
    {
      key: "unitPrice",
      dataIndex: "unitPrice",
      title: "Unit Price",
      render: (_, record) => <Currency value={record.unitPrice} />,
      sorter: (a, b) => a.unitPrice - b.unitPrice,
    },
    {
      key: "count",
      dataIndex: "count",
      title: "Count",
      render: (_, record) => (
        <OrderCount
          initValue={record.count}
          max={record.totalProducts}
          onChange={(value) =>
            dispatch(
              updateCart({
                productId: record.productId,
                total: value,
              })
            )
          }
        />
      ),
      sorter: (a, b) => a.count - b.count,
    },
    {
      key: "totalPrice",
      title: "Total Price",
      render: (_, record) => <Currency style={{ fontWeight: 500 }} value={record.totalPrice} />,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this product?"
          onConfirm={() =>
            dispatch(
              updateCart({
                productId: record.productId,
                total: 0,
              })
            )
          }
          okText="Delete"
        >
          <Button danger>
            <DeleteOutlined /> <span>Delete</span>
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <AppPage>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>My Cart</Breadcrumb.Item>
      </Breadcrumb>
      <div className={classNames(styles.container, styles["table-container"])}>
        <CustomTable
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedKeys,
            onChange: (selectedRowKeys) => {
              dispatch(chooseCarts(selectedRowKeys));
            },
          }}
          dataSource={renderCarts}
          columns={columns}
        />
      </div>
      <Affix offsetBottom={0} onChange={setAffixing}>
        <div className={classNames(styles.container, styles.actions, { [styles.affixing]: affixing })}>
          <div>
            <Checkbox
              checked={selectedKeys.length === carts.length}
              indeterminate={selectedKeys.length > 0 && selectedKeys.length < carts.length}
              onChange={handleSelectAll}
            >
              Select all ({carts.length})
            </Checkbox>
            {selectedKeys.length > 0 && (
              <Button danger type="link" size="small" onClick={handleDeleteAll}>
                Delete selected products ({selectedKeys.length})
              </Button>
            )}
          </div>
          <div className={styles["right-actions"]}>
            <div className={styles["total-payment"]}>
              <label>Total payment ({selectedKeys.length} products):</label>
              <Currency value={totalPayment} />
            </div>
            <Button disabled={selectedKeys.length === 0} size="large" type="primary" onClick={handleBuy}>
              Buy
            </Button>
          </div>
        </div>
      </Affix>
    </AppPage>
  );
}
