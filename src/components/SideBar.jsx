import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { links } from "../assets/constants";
import { UserAuth } from "./Context";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { Snackbar, Alert, Button } from "@mui/material";
import { name } from "../state";
import music from "../assets/music.png";

//dialog MUI
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const SideBar = () => {
  const data = name((state) => state.data);
  const setData = name((state) => state.setData);

  const [mobileView, setMobileView] = useState(false);
  const [error, setError] = useState("");
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [firstName, setNewName] = useState("");
  const [secondName, setSecondName] = useState("");

  const handleClose = () => {
    setError("");
  };

  const handleChange = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  const hideMenu = () => {
    setMobileView(false);
  };

  const showMenu = () => {
    setMobileView(true);
  };

  const handleDialog = () => {
    setDialog(true);
  };

  const dialogClose = () => {
    setDialog(false);
  };
  const dialogSubmit = () => {
    setData({ firstName, secondName });
    setDialog(false);
  };

  const firstNames = (e) => {
    setNewName(e.target.value);
  };
  const secondNewName = (e) => {
    setSecondName(e.target.value);
  };

  const Info = () => (
    <div className="font-mormal flex flex-col tracking-wider text-center  mt-4">
      <span className="text-gray-300 text-md font-semibold flex flex-row items-center justify-center">
        {data.firstName} {data.secondName}
        <TbEdit
          className="cursor-pointer ml-1 text-indigo-500"
          onClick={handleDialog}
        />
      </span>
      <span className="text-gray-400 text-sm mt-1">{user && user.email}</span>
    </div>
  );

  const Logingout = () => (
    <>
      {error && (
        <div className="font-bold text-red-500 my-4">
          Error: <span className="font-medium text-black">{error}</span>
        </div>
      )}
      <div className="flex items-center justify-center">
        <button
          onClick={handleChange}
          className="group relative flex justify-center  rounded-md border border-transparent bg-indigo-600 py-2 px-4 tracking-wider w-full mt-[30%] text-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Logout
          {<HiOutlineLogout className="w-5 h-5 ml-2" />}
        </button>
      </div>
    </>
  );
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-7 px-4">
        <img src={music} alt="logo" className="w-full h-20  object-contain" />
        <Info />
        <div className="mt-12">
          {links.map((link, i) => (
            <NavLink
              className={`flex flex-row justify-start items-center my-5 text-sm font-medium  hover:text-indigo-400 
              ${
                window.location.href.includes(link.to)
                  ? "text-indigo-500"
                  : "text-gray-300"
              }
              `}
              key={i}
              to={link.to}
            >
              <link.icon className="w-6 h-6 mr-2 " />
              {link.name}
            </NavLink>
          ))}
        </div>
        <Logingout />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileView ? (
          <RiCloseLine
            className="w-6 h-6 text-indigo-500 mr-2 cursor-pointer"
            onClick={hideMenu}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-indigo-500 mr-2 cursor-pointer"
            onClick={showMenu}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 backdrop-blur-xl z-10 p-6 md:hidden transition-all ${
          mobileView ? "left-0" : "-left-full"
        }`}
      >
        <img src={music} alt="logo" className="w-full h-14  object-contain" />
        <Info />
        <div className="mt-10">
          {links.map((link, i) => (
            <NavLink
              className={`flex flex-row justify-start items-center my-8 text-sm font-medium hover:text-indigo-400 ${
                window.location.href.includes(link.to)
                  ? "text-indigo-500"
                  : "text-gray-300"
              }`}
              key={i}
              to={link.to}
            >
              <link.icon className="w-6 h-6 mr-2" />
              {link.name}
            </NavLink>
          ))}
        </div>
        <Logingout />
      </div>

      <Dialog open={dialog} onClose={dialogClose}>
        <DialogTitle>Update Name</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Enter new name:</DialogContentText> */}
          <TextField
            onChange={firstNames}
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            required
            inputProps={{ maxLength: 17 }}
          />
          <TextField
            onChange={secondNewName}
            autoFocus
            margin="dense"
            id="name"
            label="Second Name"
            type="text"
            fullWidth
            variant="standard"
            required
            inputProps={{ maxLength: 17 }}
          />
        </DialogContent>
        <DialogActions>
          {firstName === "" ? (
            <Button disabled>Update</Button>
          ) : (
            <Button onClick={dialogSubmit}>Update</Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={error !== ""}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error! Log out failed
        </Alert>
      </Snackbar>
    </>
  );
};

export default SideBar;
