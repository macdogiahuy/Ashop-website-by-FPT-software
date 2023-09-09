import { AppPage } from "../../components/AppPage";
import { Breadcrumb, Button, Form, Input, message, Modal } from "antd";
import { Link } from "react-router-dom";

import styles from "./index.module.css";
import { LockOutlined } from "@ant-design/icons";
import { useUser } from "../../hooks/useUser";
import { useUpdatePassword } from "./hooks/useUpdatePassword";
import { useUpdateProfile } from "./hooks/useUpdateProfile";

export function ProfilePage() {
  const { data: user } = useUser();
  const [passwordForm] = Form.useForm();
  const { mutateAsync: updatePassword } = useUpdatePassword();
  const { mutate: updateProfile, isLoading } = useUpdateProfile();

  return (
    <AppPage>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>My profile</Breadcrumb.Item>
      </Breadcrumb>

      <Form
        initialValues={user ?? {}}
        className={styles.panel}
        layout="vertical"
        onFinish={(values) => {
          updateProfile({
            ...user,
            ...values,
          });
        }}
        disabled={isLoading}
      >
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input disabled/>
        </Form.Item>
        <Form.Item label="First name" name="firstName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Last name" name="lastName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            style={{ marginRight: 10 }}
            icon={<LockOutlined />}
            onClick={() => {
              passwordForm.setFieldsValue({});
              Modal.confirm({
                title: "Change password",
                content: (
                  <Form layout="vertical" preserve={false} form={passwordForm}>
                    <Form.Item
                      style={{ marginTop: 24 }}
                      label="Old password"
                      name="oldPassword"
                      rules={[{ required: true }]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item label="New password" name="newPassword" rules={[{ required: true }]}>
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="Confirm password"
                      name="confirmPassword"
                      rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("newPassword") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error("The two passwords that you entered do not match!"));
                          },
                        }),
                      ]}
                      dependencies={["newPassword"]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Form>
                ),
                icon: null,
                okText: "Save",
                onOk: async () => {
                  await passwordForm.validateFields();
                  const { oldPassword, newPassword } = passwordForm.getFieldsValue();
                  try {
                    await updatePassword({
                      userId: user.id,
                      passwordData: {
                        oldPassword,
                        newPassword,
                      },
                    });
                    message.success("Password has been updated!");
                  } catch (e) {
                    message.error("Invalid password");
                    throw e;
                  }
                },
              });
            }}
          >
            Change password
          </Button>
          <Button type="primary" style={{ minWidth: 100 }} htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </AppPage>
  );
}
