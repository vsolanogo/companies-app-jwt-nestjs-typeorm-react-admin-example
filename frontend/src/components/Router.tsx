import React from "react";
import { Route, Switch } from "wouter";
import { Home } from "./Home";
import { Header } from "./navigation/Header";
import { Login } from "./Login";
import { CompaniesLayer } from "./companies/CompaniesLayer";
import { RegisterLayout } from "./register/RegisterLayout";
import { ProfileLayer } from "./profile/ProfileLayer";
import { NewCompanyLayout } from "./companies/NewCompanyLayout";
import { CompanyLayout } from "./company/CompanyLayout";
import { AllCompaniesLayout } from "./companies/AllCompaniesLayout";
import { AllUsersLayout } from "./users/AllUsersLayout";
import { UserLayout } from "./users/UserLayout";

export const Router = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={RegisterLayout} />
        <Route path="/companies" component={CompaniesLayer} />
        <Route path="/profile" component={ProfileLayer} />
        <Route path="/profile/:id" component={UserLayout} />
        <Route path="/newcompany" component={NewCompanyLayout} />
        <Route path="/company/:id" component={CompanyLayout} />
        <Route path="/allcompanies" component={AllCompaniesLayout} />
        <Route path="/allusers" component={AllUsersLayout} />
      </Switch>
    </>
  );
};
