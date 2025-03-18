import { useUserDetails } from "../../user/hooks/useUserDetails";
import { Address } from "../address.model";
import { Button, Radio, RadioChangeEvent, Space, Tag } from "antd";
import { PhoneNumber } from "../../../components/PhoneNumber";
import { BankOutlined, HomeOutlined } from "@ant-design/icons";

import styles from "./index.module.css";
import { useCallback } from "react";

export function SelectAddress({
  selectedAddress,
  onChange,
  onUpdate,
}: {
  selectedAddress: Address;
  onChange: (address: Address) => void;
  onUpdate: (address: Address) => void;
}) {
  const { data: userDetails } = useUserDetails();
  const { addresses, defaultAddressId } = userDetails;

  const handleChange = useCallback(
    (event: RadioChangeEvent) => {
      onChange(addresses.find((addr) => addr.id === event.target.value));
    },
    [addresses, onChange]
  );

  return (
    <Radio.Group value={selectedAddress.id} onChange={handleChange} className={styles.addresses}>
      <Space direction="vertical" size={0} className={styles["address-wrapper"]}>
        {addresses.map((address) => (
          <Radio key={address.id} value={address.id}>
            <div className={styles.address}>
              <div className={styles.left}>
                <div className={styles.user}>
                  <span className={styles.name}>{address.name}</span>
                  <span className={styles.divider} />
                  <PhoneNumber className={styles.phone} value={address.phone} prefix={address.phonePrefix} />
                </div>
                <div className={styles.detail}>
                  <div>{address.address}</div>
                  <div>
                    <span>{address.city}</span>, <span>{address.country}</span>
                  </div>
                </div>
                <div className={styles.tags}>
                  {address.type === "home" && (
                    <Tag>
                      <HomeOutlined /> Home
                    </Tag>
                  )}
                  {address.type === "work" && (
                    <Tag>
                      <BankOutlined /> Work
                    </Tag>
                  )}
                  {address.id === defaultAddressId && <Tag color="green">Default</Tag>}
                </div>
              </div>
              <Button type="link" onClick={() => onUpdate(address)}>
                Update
              </Button>
            </div>
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
}
