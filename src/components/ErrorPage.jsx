import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/account/discover");
  };

  return (
    <div className="h-screen text-center flex flex-col justify-center items-center font-bold text-xl text-indigo-500 tracking-wide flex-wrap">
      <div>Error: Page not found</div>
      <button
        onClick={handleClick}
        className="group relative flex justify-center  rounded-md border border-transparent bg-indigo-600 py-1 px-4 mt-5 tracking-wider text-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        HOME
      </button>
    </div>
  );
};

export default ErrorPage;
