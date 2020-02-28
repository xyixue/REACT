import React from "react";
import Header from "component/Header";
const Layout = props => (
  <div className="main">
    <Header />
    {props.children}
  </div>
);

export default Layout;
