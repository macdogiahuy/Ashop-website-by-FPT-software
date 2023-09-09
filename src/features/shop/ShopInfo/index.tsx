import { Form, FormInstance, Input } from "antd";
import { StandardProps } from "../../../types/common";
import { FileUpload } from "../../../components/FileUpload";

export function ShopInfo({ form, children, onFinish, ...rest }: StandardProps & { form: FormInstance }) {
  return (
    <Form
      {...rest}
      form={form}
      preserve={false}
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      onFinish={onFinish}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Logo" name="logo">
        <FileUpload />
      </Form.Item>
      <Form.Item label="Banner" name="banner">
        <FileUpload />
      </Form.Item>

      {children}
    </Form>
  );
}
