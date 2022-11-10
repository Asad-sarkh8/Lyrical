import React from "react";

const Player = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="flex flex-row items-center">
        <img
          className={`w-20 h-20 rounded-[100%] ${data && "animate-spin"}`}
          src={data?.images?.coverart}
          alt={data?.title}
        />

        <audio
          src={data?.hub?.actions[1]?.uri}
          controls
          autoPlay
          loop
          className="w-[70%] ml-4"
        />
      </div>
    </>
  );
};

export default Player;
