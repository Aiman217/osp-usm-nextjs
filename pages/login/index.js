import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "/firebase-config";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { AiOutlineClose, AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="hero h-screen py-2">
        <div className="hero-content flex-col sm:px-10 sm:flex-row-reverse">
          <div className="text-center sm:text-left">
            <p className="hidden sm:block sm:text-2xl italic py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card card-compact flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body py-4 gap-4">
              <h1 className="text-lg font-bold uppercase text-center">Login</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
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
                    setLoginPassword(event.target.value);
                  }}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div>
                <h1
                  onClick={() => {
                    resetPassword(loginEmail);
                  }}
                  className="link text-error"
                >
                  Forgot password?
                </h1>
              </div>
              <div className="form-control">
                <button onClick={login} className="btn btn-block btn-success">
                  Login
                </button>
              </div>
              <div className="flex flex-row justify-around items-center">
                <div className="flex flex-row gap-2">
                  <button className="btn-circle bg-base-300 text-white">
                    <AiOutlineGithub size={40} className="mx-auto" />
                  </button>
                  <button className="btn-circle bg-base-300 text-white">
                    <AiOutlineGoogle size={40} className="mx-auto" />
                  </button>
                </div>
                <Link href="/register" className="cursor-pointer">Don't have an account?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <div className="toast sm:mr-4">
          <div className="alert alert-error">
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

export default Login;
