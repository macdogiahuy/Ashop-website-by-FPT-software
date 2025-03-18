import { Shop } from "../shop.model";
import { ShopInfo } from "../ShopInfo";
import { Button, Form } from "antd";
import { useEffect } from "react";
import { useUpdateShop } from "../hooks/useUpdateShop";

export function ShopAbout({ shop }: { shop: Shop }) {
  const [form] = Form.useForm();
  const { mutate: updateShop, isLoading } = useUpdateShop();

  useEffect(() => {
    form.setFieldsValue(shop);
  }, [form, shop]);

  return (
    <ShopInfo
      form={form}
      disabled={isLoading}
      onFinish={(values) => {
        updateShop(values);
      }}
    >
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: 120 }}>
          Save
        </Button>
      </Form.Item>
    </ShopInfo>
  );
}
