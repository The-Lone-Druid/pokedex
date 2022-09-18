import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import { auth, gProvider } from "../../firebase";
import Loader from "../../components/Loader";
import Bulbasaur from "../../assets/images/bulbasaur.png";
import Logo from "../../assets/images/logo.svg";

type Props = {};
type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = (props: Props) => {
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
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setIsLoading(false);
        const user = userCredential.user;
        navigate("/home");
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const googleSignup = () => {
    setIsLoading(true);
    signInWithPopup(auth, gProvider)
      .then((result) => {
        setIsLoading(false);
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/home");
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
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
    <div className="text-white py-5 d-flex align-items-center justify-content-center">
      {isLoading && <Loader />}
      <div className="overflow-y-auto col-md-6">
        <div className="bg-white shadow p-md-3 p-1 rounded d-flex align-items-center flex-md-row flex-column">
          <form
            className="p-3 text-dragon pt-3 pt-0 w-100 px-md-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="navbar-brand fw-bold d-flex fs-4 text-black mb-3 align-items-center">
                <img src={Logo} alt="" className="me-2" />
                Pokédex
              </div>
              <h3 className="fw-bold">Signup</h3>
            </div>
            <div>
              <div className="form-floating mt-4">
                <input
                  type="email"
                  className="form-control"
                  {...register("email", { required: true })}
                  placeholder="name@example.com"
                />
                <label htmlFor="email">Email address</label>
              </div>
              {errors.email && (
                <div className="mt-2 form-text text-danger">
                  {errors.email?.message}
                </div>
              )}
            </div>
            <div>
              <div className="form-floating mt-4">
                <input
                  type="password"
                  className="form-control"
                  {...register("password", { required: true })}
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </div>
              {errors.password && (
                <div className="mt-2 form-text text-danger">
                  {errors.password?.message}
                </div>
              )}
            </div>
            <div>
              <div className="form-floating mt-4">
                <input
                  type="password"
                  className="form-control"
                  {...register("confirmPassword", { required: true })}
                  placeholder="Confirm Password"
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              {errors.confirmPassword && (
                <div className="mt-2 form-text text-danger">
                  {errors.confirmPassword?.message}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button className="btn shadow py-2 w-100 btn-primary b-4">
                Signup
              </button>
            </div>
            <div>
              <p className="mb-0 fw-bold mt-2 px-3 text-center">
                Already have an account?{" "}
                <Link to={"/auth/login"} className="text-decoration-none">
                  Login.
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
                onClick={googleSignup}
                className="btn shadow py-2 btn-danger w-100 d-flex align-items-center justify-content-center"
                type="button"
              >
                <i className="bi bi-google me-2"></i>
                Signup with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
