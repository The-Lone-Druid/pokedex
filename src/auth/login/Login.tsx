import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../components/errorHandlers";
import Loader from "../../components/Loader";
import { auth, gProvider } from "../../firebase";
import Logo from "../../assets/images/logo.svg";

type Props = {};
type Inputs = {
  email: string;
  password: string;
};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setIsLoading(false);
        const user = userCredential.user;
        successToast("Successfully Signed in.");
        navigate("/home");
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        errorToast(errorMessage);
      });
  };

  const googleSignin = () => {
    setIsLoading(true);
    signInWithPopup(auth, gProvider)
      .then((result) => {
        setIsLoading(false);
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        successToast("Successfully Signed in.");
        navigate("/home");
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        errorToast(errorMessage);
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [navigate]);

  return (
    <div className="text-white vh-100 d-flex align-items-center justify-content-center">
      {isLoading && <Loader />}
      <div className="overflow-y-auto col-md-6">
        <div className="bg-white shadow p-md-3 p-1 rounded d-flex align-items-center flex-md-row flex-column">
          <form
            className="p-3 text-dragon w-100 px-md-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="navbar-brand fw-bold d-flex fs-4 text-black mb-3 align-items-center">
                <img src={Logo} alt="" className="me-2" />
                Pokédex
              </div>
              <h3 className="fw-bold">Signin</h3>
            </div>
            <div className="form-floating mt-4">
              <input
                type="email"
                className="form-control"
                {...register("email", { required: true })}
                placeholder="name@example.com"
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mt-4">
              <input
                type="password"
                className="form-control"
                {...register("password", { required: true })}
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="mt-4">
              <button className="btn shadow py-2 w-100 btn-primary b-4">
                Login
              </button>
            </div>
            <div>
              <p className="mb-0 fw-bold mt-2 px-3 text-center">
                Don't have an account?{" "}
                <Link to={"/auth/signup"} className="text-decoration-none">
                  Register.
                </Link>
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <div className="w-100 border-bottom border-dragon border-2"></div>
              <div className="px-2">OR</div>
              <div className="w-100 border-bottom border-dragon border-2"></div>
            </div>
            <div className="mt-4">
              <button
                onClick={googleSignin}
                className="btn shadow py-2 btn-danger w-100 d-flex align-items-center justify-content-center"
                type="button"
              >
                <i className="bi bi-google me-2"></i>
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
