import { ReactElement } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";

export function AuthRequired({ children }: { children: ReactElement }) {
  const { isLoggedIn, isFetching } = useIsLoggedIn();
  const location = useLocation();

  if (isFetching) {
    return <Spin />;
  }

  return isLoggedIn ? (
    children
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          prevPathName: location.pathname,
        },
      }}
    />
  );
}
