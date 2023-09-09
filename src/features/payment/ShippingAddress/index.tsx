import { EnvironmentOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Skeleton, Tag } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Address } from "../../address/address.model";
import { useUserDetails } from "../../user/hooks/useUserDetails";

import styles from "./index.module.css";
import { PhoneNumber } from "../../../components/PhoneNumber";
import { SelectAddress } from "../../address/SelectAddress";
import { UpdateAddress } from "../../address/UpdateAddress";
import classNames from "classnames";
import { useUpdateAddress } from "../../address/hooks/useUpdateAddress";
import { useAddAddress } from "../../address/hooks/useAddAddress";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectPaymentAddress, setPaymentAddress } from "../payment.slice";

export function ShippingAddress() {
  const { data: userDetails } = useUserDetails();
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectPaymentAddress);
  const [changingAddress, setChangingAddress] = useState<Address | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address>();
  const [saving, setSaving] = useState(false);
  const [editingForm] = Form.useForm();
  const { mutateAsync: updateAddress } = useUpdateAddress();
  const { mutateAsync: addAddress } = useAddAddress();

  useEffect(() => {
    const defaultSelectAddress = userDetails?.addresses.find((addr) => addr.id === userDetails.defaultAddressId);
    dispatch(setPaymentAddress(defaultSelectAddress));
    setChangingAddress(defaultSelectAddress);
  }, [dispatch, userDetails]);

  const handleAddressChange = useCallback((address: Address) => {
    setChangingAddress(address);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditing(false);
    setEditingAddress(null);
    if (!editing) {
      setShowModal(false);
    }
  }, [editing]);

  const handleEditAddress = useCallback(
    (address: Address) => {
      setEditing(true);
      setEditingAddress({
        ...address,
        isDefault: userDetails?.defaultAddressId === address.id,
      });
    },
    [userDetails?.defaultAddressId]
  );

  const handleSave = async () => {
    if (editing) {
      const isAddNew = !editingAddress;
      const addressValue = editingForm.getFieldsValue();
      try {
        setSaving(true);
        if (isAddNew) {
          await addAddress(addressValue);
        } else {
          await updateAddress({
            ...addressValue,
            id: editingAddress.id,
          });
        }
        setEditing(false);
      } finally {
        setSaving(false);
      }
    } else {
      dispatch(setPaymentAddress(changingAddress));
      handleCloseModal();
    }
  };

  return (
    <>
      <span className={styles["delivery-address__label"]}>
        <EnvironmentOutlined /> <span>Delivery address</span>
      </span>
      <div className={styles["delivery-address__info"]}>
        {address && (
          <div className={styles["delivery-address__content"]}>
            <span className={styles["address-name"]}>
              {address.name}
              <span style={{ marginLeft: 8 }}>
                <PhoneNumber value={address.phone} prefix={address.phonePrefix} />
                <PhoneOutlined style={{ marginLeft: 5 }} />
              </span>
            </span>
            <span className={styles["actual-address"]}>
              {address.address}, {address.city}, {address.country}{" "}
              {userDetails?.defaultAddressId === address.id && (
                <Tag style={{ marginLeft: 8 }} color="green">
                  Default
                </Tag>
              )}
            </span>
            <Button type="link" size="small" onClick={() => setShowModal(true)}>
              CHANGE
            </Button>
          </div>
        )}
        {!address && <Skeleton.Button block active size="small" />}
      </div>
      {address && (
        <Modal
          className={classNames(styles.modal, { [styles["modal--editing"]]: editing })}
          title={editing ? (editingAddress ? "Update Address" : "Add New Address") : "My Address"}
          open={showModal}
          onCancel={handleCloseModal}
          footer={
            <div>
              {!editing && (
                <Button
                  type="text"
                  onClick={() => {
                    setEditingAddress(null);
                    setEditing(true);
                  }}
                >
                  <PlusOutlined /> <span>Add new address</span>
                </Button>
              )}
              <div>
                <Button
                  onClick={() => {
                    if (editing) {
                      setEditing(false);
                    } else {
                      handleCloseModal();
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button loading={saving} type="primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          }
        >
          {!editing && (
            <SelectAddress
              selectedAddress={changingAddress}
              onChange={handleAddressChange}
              onUpdate={handleEditAddress}
            />
          )}
          {editing && <UpdateAddress form={editingForm} address={editingAddress} disabled={saving} />}
        </Modal>
      )}
    </>
  );
}
