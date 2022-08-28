import { useEffect, useState } from "react";
import Link from "next/link";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { auth } from "/firebase-config";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import {
  AiOutlineClose,
  AiOutlineGithub,
  AiOutlineGoogle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  const loginEmailandPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      router.push("/");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  const loginGoogle = async () => {
    const GoogleProvider = new GoogleAuthProvider();
    await signInWithRedirect(auth, GoogleProvider);
  };

  const loginGithub = async () => {
    const GithubProvider = new GithubAuthProvider();
    await signInWithRedirect(auth, GithubProvider);
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          router.push("/");
        }
      })
      .catch((error) => {
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 4000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginGoogle, loginGithub]);

  return (
    <>
      <Head>
        <title>OSP@USM | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-center items-center h-full sm:bg-[url('/login_bg.png')] bg-contain">
        <div className="hero sm:backdrop-brightness-50 h-full">
          <div className="hero-content w-full flex-col sm:px-10 sm:flex-row-reverse">
            <div className="card card-compact flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <h1 className="text-lg font-bold uppercase text-center">
                    Login
                  </h1>
                  <div className="divider p-0 m-0"></div>
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
                </div>
                <div className="w-fit">
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
                  <button
                    onClick={loginEmailandPassword}
                    className="btn btn-block btn-success"
                  >
                    Login
                  </button>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-around items-center gap-2">
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={loginGithub}
                      className="btn-circle bg-base-300 text-white"
                    >
                      <AiOutlineGithub size={30} className="mx-auto hover:scale-105" />
                    </button>
                    <button
                      onClick={loginGoogle}
                      className="btn-circle bg-base-300 text-white"
                    >
                      <AiOutlineGoogle size={30} className="mx-auto hover:scale-105" />
                    </button>
                  </div>
                  <Link href="/register" className="cursor-pointer">
                    Don&apos;t have an account?
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
      </div>
    </>
  );
};

export default Login;
