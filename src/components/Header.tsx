import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { auth } from "../firebase";
import PokeBall from "../assets/images/pokeball.png";
import { useAppSelector } from "../app/hooks";
import { selectAuthData } from "../features/auth/authSlice";

type Props = {
  visible?: boolean;
};

const Header = (props: Props) => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectAuthData);

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
        <div>
          {/* profile */}
          <div className="dropdown">
            <img
              src={PokeBall}
              className="rounded-full"
              height={40}
              width={40}
              data-bs-toggle="dropdown"
            />
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <div className="p-2">
                  Logged in as:
                  <div>
                    <b>{currentUser?.email}</b>
                  </div>
                </div>
              </li>
              <li
                className="dropdown-item"
                onClick={() => {
                  auth.signOut().then(() => {
                    navigate("/auth/login");
                  });
                }}
              >
                <div className=" p-2 d-flex items-center">
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
};

export default Header;
