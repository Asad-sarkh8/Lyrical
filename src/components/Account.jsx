import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TopPlay from "./TopPlay";
import SearchBar from "./SearchBar";

const Account = () => {
  return (
    <div className=" flex flex-col">
      <div className="relative flex">
        <SideBar />
        <div className="flex-1 flex flex-col bg-[#23272a]">
          <SearchBar />
          <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll scrollbar-hide flex xl:flex-row flex-col-reverse">
            <div className="flex-1 h-fit pb-40">
              <Outlet />
            </div>
            <div className="xl:sticky md:w-[35%] relative top-0 h-fit">
              <TopPlay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
