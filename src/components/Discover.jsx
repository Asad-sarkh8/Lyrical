import React from "react";
import { useEffect, useState } from "react";
import { genres } from "../assets/constants";
import Card from "./Card";
import Loader from "./Loader";

const Discover = () => {
  const [songs, setSongs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [genre, setGenre] = useState("POP");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_DATA_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_DATA_API_HOST,
      },
    };

    fetch(
      `https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${genre}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSongs(response))
      .then((response) => setFetching(false))
      .catch((err) => console.error(err.message));
  }, [genre]);

  const handleOption = (e) => {
    setFetching(true);
    setSongs([]);
    setGenre(e.target.value);
  };
  if (fetching) return <Loader title={"loading Songs...."} />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-indigo-500 text-left ">
          Discover '{genre}'
        </h2>
        <select
          onChange={handleOption}
          value={genre}
          className="bg-[#2c2f33] font-semibold text-indigo-400 hover:text-indigo-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 cursor-pointer"
        >
          {genres.map((genre, i) => (
            <option key={i} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <div key={i} className="m-1 mt-[10px] max-w-[320px] md:max-w-[250px]">
            <Card key={i} i={i} song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
