import { Checkbox, Form, FormInstance, Input, Select, Tag } from "antd";
import { Address } from "../address.model";
import { useCallback, useMemo, useState } from "react";
import { PHONE_NUMBER_PREFIXES } from "../../../config/phone-number-prefix";
import { useCountries } from "../hooks/useCountries";
import { useCities } from "../hooks/useCities";
import { DEFAULT_ADDRESS } from "../../../config/default-address";
import { BankOutlined, HomeOutlined } from "@ant-design/icons";

import styles from "./index.module.css";

function AddressType({ value, onChange }: { value?: string; onChange?: (value: string) => void }) {
  const [type, setType] = useState(value || "home");

  return (
    <div>
      <Tag.CheckableTag
        checked={type === "home"}
        onChange={(checked) => {
          if (checked) {
            setType("home");
            onChange?.("home");
          }
        }}
      >
        <HomeOutlined /> Home
      </Tag.CheckableTag>
      <Tag.CheckableTag
        checked={type === "work"}
        onChange={(checked) => {
          if (checked) {
            setType("work");
            onChange?.("work");
          }
        }}
      >
        <BankOutlined /> Work
      </Tag.CheckableTag>
    </div>
  );
}

export function UpdateAddress({
  form,
  address,
  disabled,
}: {
  form: FormInstance;
  address?: Address;
  disabled?: boolean;
}) {
  const phonePrefixes = useMemo(() => PHONE_NUMBER_PREFIXES.filter((prefix) => !prefix.code.includes(" ")), []);
  const defaultAddress = address ?? DEFAULT_ADDRESS;
  const [country, setCountry] = useState<string>(defaultAddress.country);
  const { data: countries } = useCountries();
  const { data: cities } = useCities(country);

  const handleCountryChange = useCallback(
    (value) => {
      setCountry(value);
      form.setFieldValue("city", null);
    },
    [form]
  );

  return (
    <Form form={form} preserve={false} layout="vertical" initialValues={defaultAddress} disabled={!!disabled}>
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="name"
          label="Full name"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 16px)" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone number"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50%)", margin: "0 0 0 16px" }}
        >
          <Input
            addonBefore={
              <Form.Item name="phonePrefix" noStyle>
                <Select style={{ width: 80 }} showSearch>
                  {phonePrefixes &&
                    phonePrefixes.map((prefix) => (
                      <Select.Option key={prefix.name} value={prefix.code}>
                        {prefix.code}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            }
          />
        </Form.Item>
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 16px)" }}
        >
          <Select loading={!countries} onChange={handleCountryChange} showSearch>
            {countries &&
              countries.map((country) => (
                <Select.Option key={country} value={country}>
                  {country}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50%)", margin: "0 0 0 16px" }}
        >
          <Select loading={!cities} showSearch>
            {cities &&
              cities.map((city) => (
                <Select.Option key={city} value={city}>
                  {city}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item name="address" label="Address detail" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="type" label="Type" className={styles["form-item--horizontal"]}>
        <AddressType />
      </Form.Item>

      <Form.Item name="isDefault" valuePropName="checked" noStyle>
        <Checkbox disabled={defaultAddress.isDefault}>Set as default address</Checkbox>
      </Form.Item>
    </Form>
  );
}
