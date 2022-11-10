import React from "react";
import { useState } from "react";
import { UserAuth } from "./Context";
import { Link, useNavigate } from "react-router-dom";
import PWDverification from "./PWDverification";
import { name } from "../state";
import { useEffect } from "react";
import { Backdrop } from "@mui/material";
import music from "../assets/music.png";
import Loader from "./Loader";

const Signup = () => {
  const setData = name((state) => state.setData);

  const [secondName, setsecondName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePWD, setTogglePWD] = useState(false);
  const [pwdVal, setpwdVal] = useState(false);
  const [check, setCheck] = useState({
    capLetterCheck: false,
    numCheck: false,
    pwdLenghtCheck: false,
    specialcharCheck: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser } = UserAuth();
  const [backdrop, setBackDrop] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBackDrop(true);
    try {
      await createUser(email, password);
      navigate("/");
    } catch (e) {
      setError("Email is already registered");
      setBackDrop(false);
    }
  };
  useEffect(() => {
    setData({ firstName, secondName });
  }, [firstName, secondName]);

  const handleKeyUp = (e) => {
    const { value } = e.target;
    const capLetterCheck = /[A-Z]/.test(value);
    const numCheck = /[0-9]/.test(value);
    const pwdLenghtCheck = value.length >= 8;
    const specialcharCheck = /[!@#$%^&*]/.test(value);
    setCheck({
      capLetterCheck,
      numCheck,
      pwdLenghtCheck,
      specialcharCheck,
    });
  };

  const toggleFalse = () => {
    setTogglePWD(true);
  };
  const toggleTrue = () => {
    setTogglePWD(false);
  };

  const handleSecondNameChange = (e) => setsecondName(e.target.value);

  return (
    <>
      <div className="flex h-screen justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 border border-indigo-500 p-8 ">
          <div>
            <img
              className="mx-auto h-[80px] w-auto"
              src={music}
              alt="Company logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-300">
              Create a new Account
            </h2>
            <p className="mt-2  text-center text-sm text-gray-400">
              Or <span>Already have an account?</span>
              <br />
              <Link
                to="/"
                className="font-medium text-lg tracking-wider text-indigo-500 hover:text-indigo-400"
              >
                Sign In
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex flex-col md:flex-row">
                <input
                  onChange={(e) => setfirstName(e.target.value)}
                  id="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  maxLength="15"
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 mt-5 md:mr-3 text-gray-900 font-medium tracking-wider placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First Name*"
                />
                <input
                  onChange={handleSecondNameChange}
                  id="secondName"
                  type="text"
                  autoComplete="secondName"
                  required
                  maxLength="15"
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 mt-5 text-gray-900 tracking-wider font-medium placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Second Name*"
                />
              </div>
              <div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 mt-5 text-gray-900 tracking-wider font-medium placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address*"
                />
              </div>
              <div>
                {togglePWD ? (
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => {
                      setpwdVal(true);
                    }}
                    onBlur={() => setpwdVal(false)}
                    onKeyUp={handleKeyUp}
                    id="password"
                    name="password"
                    type="text"
                    autoComplete="current-password"
                    required
                    maxLength="30"
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 mt-5 text-gray-900 tracking-wider font-medium placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password*"
                  />
                ) : (
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => {
                      setpwdVal(true);
                    }}
                    onBlur={() => setpwdVal(false)}
                    onKeyUp={handleKeyUp}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    maxLength="30"
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 mt-5 text-gray-900 tracking-wider font-medium placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password*"
                  />
                )}

                {togglePWD ? (
                  <span
                    className="font-normal text-gray-400 my-1 mr-2 flex justify-end cursor-pointer"
                    onClick={toggleTrue}
                  >
                    Hide
                  </span>
                ) : (
                  <span
                    className="font-normal text-gray-400 my-1 mr-2 flex justify-end cursor-pointer"
                    onClick={toggleFalse}
                  >
                    Show
                  </span>
                )}
              </div>
            </div>

            {error && (
              <div className="font-bold text-red-600 tracking-wider my-4">
                Error:{" "}
                <span className="font-medium text-gray-300">{error}</span>
              </div>
            )}
            {pwdVal && (
              <div className="my-3">
                <PWDverification
                  capLetterFlag={check.capLetterCheck ? "valid" : "invalid"}
                  numCheck={check.numCheck ? "valid" : "invalid"}
                  pwdLenghtCheck={check.pwdLenghtCheck ? "valid" : "invalid"}
                  specialcharCheck={
                    check.specialcharCheck ? "valid" : "invalid"
                  }
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent tracking-wider bg-indigo-600 py-2 px-4 mt-7 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Account
              </button>
              {backdrop && (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={true}
                >
                  <Loader />
                </Backdrop>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
