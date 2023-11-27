import React from "react";
import { Route, Switch } from "wouter";
import { Home } from "./Home";
import { Header } from "./navigation/Header";
import { Login } from "./Login";
import { Register } from "./Register";
import { CompaniesLayer } from "./companies/CompaniesLayer";

export const Router = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/companies" component={CompaniesLayer} />
      </Switch>
    </>
  );
};
