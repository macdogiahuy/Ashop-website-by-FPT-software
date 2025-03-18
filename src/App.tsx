import React from "react";
import { queryClient } from "./app/store";
import "./App.less";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthRequired } from "./components/AuthRequired";
import { routes } from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          {routes.map(({ Component, authRequired, path, exact }, index) => (
            <Route key={index} path={path} exact={exact}>
              {authRequired ? (
                <AuthRequired>
                  <Component />
                </AuthRequired>
              ) : (
                <Component />
              )}
            </Route>
          ))}
        </Switch>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
