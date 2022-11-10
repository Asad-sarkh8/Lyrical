import { CircularProgress } from "@mui/material";

const Loader = ({ title }) => {
  return (
    <div className="w-full flex justify-center items-center flex-col mt-20">
      <CircularProgress color="primary" size={50} />
      <h1 className="font-bold text-lg tracking-wider text-indigo-500 mt-2">
        {title || "loading...."}
      </h1>
    </div>
  );
};

export default Loader;
