import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <div className="vh-100 overflow-y-auto bg-dragon bg-gradient">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
