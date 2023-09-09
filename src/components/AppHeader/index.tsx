import { Badge, Layout, Menu } from "antd";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import {
  HistoryOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUser } from "../../hooks/useUser";

import styles from "./index.module.css";
import { useHistory } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { MenuInfo } from "rc-menu/lib/interface";

import shop from "../../images/shop.png";
import { useLogout } from "../../features/auth/hooks/useLogout";
import { useAppSelector } from "../../app/hooks";
import { selectCarts } from "../../features/cart/cart.slice";
import { SearchBox } from "./SearchBox";

const { Header } = Layout;

export function AppHeader() {
  const { isLoggedIn } = useIsLoggedIn();
  const { mutate } = useLogout();
  const { data: user } = useUser();
  const history = useHistory();
  const carts = useAppSelector(selectCarts);
  const addToCartCount = useMemo(() => carts.reduce((prev, curr) => prev + curr.total, 0), [carts]);

  const handleClick = useCallback(
    (info: MenuInfo) => {
      switch (info.key) {
        case "home":
          history.push("/");
          break;
        case "logout":
          mutate({});
          break;
        default:
          history.push(`/${info.key}`);
      }
    },
    [history, mutate]
  );

  const handleClickLogo = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <Header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo} onClick={handleClickLogo}>
          <img src={shop} alt="logo" />
          <span>A Shop</span>
        </div>
        <SearchBox />
        <Menu
          className={styles.menu}
          defaultActiveFirst
          theme="light"
          mode="horizontal"
          onClick={handleClick}
          items={[
            {
              label: "Home",
              key: "home",
              icon: <HomeOutlined />,
            },
            {
              label: "Cart",
              key: "cart",
              icon: (
                <Badge count={addToCartCount}>
                  <ShoppingCartOutlined />
                </Badge>
              ),
            },
            isLoggedIn && {
              label: user.email,
              key: "user",
              icon: <UserOutlined />,
              children: [
                {
                  label: "My profile",
                  key: "profile",
                  icon: <ProfileOutlined />,
                },
                {
                  label: "Order history",
                  key: "orders",
                  icon: <HistoryOutlined />,
                },
                {
                  label: "My shop",
                  key: "shop",
                  icon: <ShopOutlined />,
                },
                {
                  label: "Logout",
                  key: "logout",
                  icon: <LogoutOutlined />,
                },
              ],
            },
            !isLoggedIn && {
              label: "Register",
              key: "register",
              icon: <UserAddOutlined />,
            },
            !isLoggedIn && {
              label: "Login",
              key: "login",
              icon: <LoginOutlined />,
            },
          ].filter(Boolean)}
        />
      </div>
    </Header>
  );
}
