import { CreditCardOutlined, DollarOutlined } from "@ant-design/icons";

export const PAYMENT_METHODS = {
  credit: {
    name: "Credit/Debit card",
    icon: <DollarOutlined />,
  },
  cod: {
    name: "Cash on delivery (COD) ",
    icon: <CreditCardOutlined />,
  },
};
