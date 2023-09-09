import { CreditPaymentMethod } from "../../payment.model";
import { Alert, Button, Form, Input, Modal, Radio, RadioChangeEvent, Space } from "antd";
import { FieldBinaryOutlined, PlusOutlined, SecurityScanOutlined, UserOutlined } from "@ant-design/icons";
import { useAddCreditCard } from "../../hooks/useAddCreditCard";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectPaymentMethod, setPaymentMethod } from "../../payment.slice";

export function CreditPayment({ credit }: { credit: CreditPaymentMethod }) {
  const { mutateAsync: addCreditCard } = useAddCreditCard();
  const [form] = Form.useForm();
  const paymentMethod = useAppSelector(selectPaymentMethod);
  const dispatch = useAppDispatch();

  const handleSelectCard = useCallback(
    (event: RadioChangeEvent) => {
      dispatch(
        setPaymentMethod({
          type: "credit",
          meta: event.target.value,
        })
      );
    },
    [dispatch]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "fit-content" }}>
      <Radio.Group value={paymentMethod?.meta} onChange={handleSelectCard}>
        <Space direction="vertical" size="middle">
          {credit.cards.map((card) => (
            <Radio value={card.id} key={card.id}>
              <div>
                <FieldBinaryOutlined />
                <span style={{ marginLeft: 5 }}>**** **** **** {card.number.substring(card.number.length - 4)}</span>
              </div>
              <div>
                <UserOutlined />
                <span style={{ marginLeft: 5 }}>{card.ownerName}</span>
              </div>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      <Button
        style={{ marginTop: 20, alignSelf: "flex-start" }}
        onClick={() => {
          Modal.confirm({
            title: "Add card",
            icon: null,
            onOk: async () => {
              await form.validateFields();
              const result = await addCreditCard(form.getFieldsValue());
              dispatch(
                setPaymentMethod({
                  type: "credit",
                  meta: result.id,
                })
              );
            },
            okText: "Add",
            content: (
              <Form form={form} preserve={false}>
                <Alert
                  icon={<SecurityScanOutlined />}
                  style={{ margin: "24px 0" }}
                  type="info"
                  message="Your card information is secure."
                  description="A Shop will not be granted access to your card information."
                  showIcon
                />
                <Form.Item
                  name="number"
                  rules={[
                    {
                      required: true,
                      pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
                      message: "Invalid format (ex: 4929102473636854)",
                    },
                  ]}
                >
                  <Input placeholder="Card number" />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="exp"
                    rules={[{ required: true, pattern: /^[0-9]{2}\/[0-9]{2}$/, message: "Invalid format (ex: 03/23)" }]}
                    style={{ display: "inline-block", width: "calc(50% - 16px)" }}
                  >
                    <Input placeholder="Expiration Date (MM/YY)" />
                  </Form.Item>
                  <Form.Item
                    name="cvv"
                    rules={[{ required: true, pattern: /^[0-9]{3}$/, message: "Invalid format (ex: 123)" }]}
                    style={{ display: "inline-block", width: "calc(50%)", margin: "0 0 0 16px" }}
                  >
                    <Input placeholder="CVV" />
                  </Form.Item>
                </Form.Item>
                <Form.Item name="ownerName" rules={[{ required: true }]}>
                  <Input placeholder="Owner name" />
                </Form.Item>
              </Form>
            ),
          });
        }}
      >
        <PlusOutlined /> Add new card
      </Button>
    </div>
  );
}
