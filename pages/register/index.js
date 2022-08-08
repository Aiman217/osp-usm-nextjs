import { useState, useEffect } from "react";
import Link from "next/link";
import _ from "lodash";
import { useRouter } from "next/router";
import { auth } from "/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [samePass, setSamePass] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      router.push("/");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  useEffect(() => {
    if (!(_.isEmpty(registerPassword))) {
      registerPassword === registerConfirmPassword
        ? setSamePass(true)
        : setSamePass(false);
    }
  }, [registerPassword, registerConfirmPassword]);

  return (
    <>
      <div className="hero">
        <div className="hero-content w-full flex-col sm:px-10 sm:flex-row-reverse">
          <div className="text-center sm:text-left">
            <p className="hidden sm:block sm:text-2xl italic">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card card-compact flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <h1 className="text-lg font-bold uppercase text-center">
                  Register
                </h1>
                <div className="divider p-0 m-0"></div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                  type="email"
                  placeholder="email"
                  className="peer input input-bordered"
                />
                <p className="mt-2 invisible absolute peer-invalid:visible text-error text-xs peer-invalid:static">
                  Please provide a valid email address.
                </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                  type={show ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                />
                <div className=" absolute inset-y-0 right-0 translate-y-[200px] -translate-x-6">
                  <label className="swap">
                    <input type="checkbox" />
                    <AiOutlineEye
                      size={20}
                      className="swap-on"
                      onClick={() => setShow(true)}
                    />
                    <AiOutlineEyeInvisible
                      size={20}
                      className="swap-off"
                      onClick={() => setShow(false)}
                    />
                  </label>
                </div>
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  onChange={(event) => {
                    setRegisterConfirmPassword(event.target.value);
                  }}
                  type={show ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                />
                {!samePass ? (
                  <p className="mt-2 visible static text-error text-xs ">
                    Password is not the same.
                  </p>
                ) : (
                  []
                )}
                <div className=" absolute inset-y-0 right-0 translate-y-[285px] -translate-x-6">
                  <label className="swap">
                    <input type="checkbox" />
                    <AiOutlineEye
                      size={20}
                      className="swap-on"
                      onClick={() => setShow(true)}
                    />
                    <AiOutlineEyeInvisible
                      size={20}
                      className="swap-off"
                      onClick={() => setShow(false)}
                    />
                  </label>
                </div>
              </div>
              <div className="form-control">
                <button
                  onClick={register}
                  className={
                    "btn btn-block btn-success mt-6 " +
                    (samePass ? " " : "btn-disabled")
                  }
                >
                  Register
                </button>
              </div>
              <div className="flex justify-center items-center">
                <Link href="/login" className="cursor-pointer">
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!_.isEmpty(error) && (
        <div className="toast sm:mr-4">
          <div className="alert alert-error shadow-lg">
            <div>
              <span>{error}</span>
              <AiOutlineClose
                onClick={() => setError("")}
                size={20}
                className="text-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
