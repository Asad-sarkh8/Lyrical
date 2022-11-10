import { useState } from "react";
import { UserAuth } from "./Context";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert, Button, Backdrop } from "@mui/material";
import music from "../assets/music.png";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "./Loader";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [verified, setVerified] = useState(true);
  const [verifyError, setVerifyError] = useState("");
  const [sentMail, setSentMail] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [resetMail, setResetMail] = useState("");
  const [sendResetMail, setSendResetMail] = useState(false);
  const [resetError, setResetError] = useState("");
  const [backdrop, setBackDrop] = useState(false);

  const { signin, verification, resetPWD } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBackDrop(true);
    try {
      const user = await signin(email, password);
      if (user?.user?.emailVerified) navigate("/account/discover");
      setVerified(user?.user?.emailVerified);
    } catch (e) {
      setError("Invalid password");
      setBackDrop(false);
    }
  };

  const handlePWD = (e) => {
    setPassword(e.target.value);
    setVerified(true);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setVerified(true);
  };

  const handleButtonClick = async () => {
    setVerified(true);

    try {
      await verification();
      setSentMail(true);
    } catch (e) {
      setVerifyError(e.message);
    }
  };

  const handleClose = () => {
    setSentMail(false);
    setVerifyError("");
  };

  const resetState = () => {
    setDialog(true);
  };

  const dialogClose = () => {
    setDialog(false);
    setResetMail("");
  };

  const setMail = (e) => {
    setResetMail(e.target.value);
  };

  const handleResetPWD = async () => {
    try {
      setDialog(false);
      await resetPWD(resetMail);
      setSendResetMail(true);
      setResetMail("");
    } catch (error) {
      setResetMail("");
      setResetError(error.message);
    }
  };

  const resetClose = () => {
    setSendResetMail(false);
  };

  const resetErrorHandle = () => {
    setResetError("");
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md border border-indigo-500 space-y-8 p-8 ">
          <div>
            <img
              className="mx-auto h-[80px] w-auto"
              src={music}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-200">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              Or <span>Don't have an account?</span>
              <br />
              <Link
                to="/signup"
                className="font-medium text-lg text-indigo-400 hover:text-indigo-500"
              >
                Sign Up for free
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="">
              <div>
                <input
                  onChange={handleEmail}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 my-5 text-gray-900 font-medium tracking-wider placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  onChange={handlePWD}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  maxLength="30"
                  className="relative block w-full appearance-none rounded-md border border-gray-400 font-medium tracking-wider  px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between my-5">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block font-medium text-md text-indigo-400 tracking-wide"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm cursor-pointer">
                <span
                  onClick={resetState}
                  className="font-medium  text-indigo-400 hover:text-indigo-500 tracking-wider"
                >
                  Forgot password?
                </span>
              </div>
            </div>

            <Dialog open={dialog} onClose={dialogClose}>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To reset your password, please enter your email address here.
                  We will send an email with reset link.
                </DialogContentText>
                <TextField
                  onChange={setMail}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                  required
                />
              </DialogContent>
              <DialogActions>
                {!resetMail ? (
                  <Button disabled>Send Email</Button>
                ) : (
                  <Button onClick={handleResetPWD}>Send Email</Button>
                )}
              </DialogActions>
            </Dialog>

            {error && (
              <div className="font-bold text-red-700 tracking-wide my-4">
                Error:{" "}
                <span className="font-medium text-gray-300">{error}</span>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 mt-10 py-2 px-4 text-sm font-medium text-gray-200 tracking-widest hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
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
      <Snackbar open={!verified} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Email not verified
          <Button
            size="small"
            onClick={handleButtonClick}
            sx={{ lineHeight: "initial" }}
          >
            Verify
          </Button>
        </Alert>
      </Snackbar>

      <Snackbar open={sentMail} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Email sent! Check your inbox
        </Alert>
      </Snackbar>

      <Snackbar
        open={verifyError !== ""}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          An Error occurred! Email not sent
        </Alert>
      </Snackbar>

      <Snackbar
        open={sendResetMail}
        autoHideDuration={4000}
        onClose={resetClose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Email sent! Check your inbox
        </Alert>
      </Snackbar>

      <Snackbar
        open={resetError !== ""}
        autoHideDuration={6000}
        onClose={resetErrorHandle}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error: Email not sent
        </Alert>
      </Snackbar>
    </>
  );
};

export default Signin;
