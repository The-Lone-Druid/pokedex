import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";

type Props = {
  visible?: boolean;
};

const Header = (props: Props) => {
  return props.visible ? (
    <nav className="navbar navbar-expand-lg navbar-light bg-electric">
      <div className="container">
        <Link
          to={"/home"}
          className="navbar-brand fw-bold d-flex align-items-center"
        >
          <img src={Logo} alt="" className="me-2" />
          Pokédex
        </Link>
        <div></div>
      </div>
    </nav>
  ) : (
    <></>
  );
};

export default Header;
