import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AiOutlineClose } from "react-icons/ai";

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

  return (
    <>
      <div className="hero h-screen py-2">
        <div className="hero-content flex-col sm:px-10 sm:flex-row-reverse">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold">Login now!</h1>
            <p className="hidden sm:block sm:text-2xl italic py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body py-4">
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
                <label className="label">
                  <Link href="/">Forget Password?</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button onClick={login} className="btn btn-success">
                  Login
                </button>
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
