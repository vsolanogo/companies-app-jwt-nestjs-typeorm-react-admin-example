import React, { Component } from "react";
import { Redirect, Route } from "wouter";
import { getToken } from "../helpers/tokenstorage";

export const PrivateRoute = (props) => {
  const renderChildren = () =>
    getToken() ? <Component {...props} /> : <Redirect to="/signin" />;
  return <Route>{renderChildren}</Route>;
};
