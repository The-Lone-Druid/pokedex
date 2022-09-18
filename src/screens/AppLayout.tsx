import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { setAuthState } from "../features/auth/authSlice";
import { auth } from "../firebase";

type Props = {};

const AppLayout = (props: Props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthState(user));
        setIsLoading(false);
      } else {
        navigate("/auth/login");
        setIsLoading(false);
      }
    });
  }, [navigate]);

  return (
    <div className="container-fluid p-0 vh-100 d-flex flex-column">
      {isLoading && <Loader />}
      <Header visible={params?.pokemonName ? false : true} />
      <div className="flex-fill overflow-y-auto bg-light-gray">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
