import { AppPage } from "../../components/AppPage";
import { Breadcrumb, Button, Form, Input, InputNumber, message, Select, Skeleton } from "antd";
import { Link, useHistory } from "react-router-dom";

import styles from "./index.module.css";
import { Product } from "../product/product.model";
import { useParams } from "react-router";
import { FileUpload } from "../../components/FileUpload";
import { useCategories } from "../category/hooks/useCategories";
import { useProduct } from "../product/hooks/useProduct";
import { StandardProps } from "../../types/common";
import { useUpdateProduct } from "./hooks/useUpdateProduct";
import { useAddProduct } from "./hooks/useAddProduct";

function ProductImages({ value, onChange, ...rest }: StandardProps) {
  const transformedValue = value ? value.map((item) => item.original) : value;
  return (
    <FileUpload
      {...rest}
      multiple
      value={transformedValue}
      onChange={(changedValue) => {
        if (Array.isArray(changedValue)) {
          onChange(changedValue.map((item) => ({ original: item })));
        } else {
          onChange(changedValue);
        }
      }}
    />
  );
}

function ProductForm({
  product,
  onFinish,
  isSaving,
}: {
  product?: Product;
  onFinish?: (values: any) => void;
  isSaving?: boolean;
}) {
  const { data: categories = [], isLoading } = useCategories();
  return (
    <div className={styles.panel}>
      <Form initialValues={product ?? {}} layout="vertical" onFinish={onFinish} disabled={!!isSaving}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, min: 0, type: "number" }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Count" name="count" rules={[{ required: true, min: 1, type: "number" }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true }]}>
          <Select loading={isLoading} showSearch>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item label="Thumbnail" name="thumbnail" rules={[{ required: true }]}>
          <FileUpload />
        </Form.Item>
        <Form.Item label="Images" name="images">
          <ProductImages />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" style={{ width: 120 }} htmlType="submit" loading={isSaving}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function AddProduct() {
  const { mutateAsync: addProduct, isLoading } = useAddProduct();
  const history = useHistory();

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/shop">My Shop</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add new product</Breadcrumb.Item>
      </Breadcrumb>
      <ProductForm
        onFinish={async (values) => {
          const result = await addProduct(values);
          history.push(`/my-product/${result.id}`);
          message.success("Added new product");
        }}
        isSaving={isLoading}
      />
    </>
  );
}

function UpdateProduct({ id }: { id: string }) {
  const { data: product } = useProduct(id);
  const { mutate: updateProduct, isLoading } = useUpdateProduct();

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/shop">My Shop</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {product && product.name}
          {!product && <Skeleton.Button size="small" style={{ width: 120 }} />}
        </Breadcrumb.Item>
      </Breadcrumb>
      {!product && <Skeleton />}
      {product && (
        <ProductForm
          product={product}
          onFinish={(values) => {
            updateProduct({
              ...product,
              ...values,
            });
          }}
          isSaving={isLoading}
        />
      )}
    </>
  );
}

export function MyProductPage() {
  const { id } = useParams<any>();

  return (
    <AppPage>
      {id && <UpdateProduct id={id} />}
      {!id && <AddProduct />}
    </AppPage>
  );
}
