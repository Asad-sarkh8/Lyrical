import { useEffect, useState } from "react";
import { countries } from "../assets/constants";
import Card from "./Card";
import Loader from "./Loader";

const AroundYou = () => {
  const [songs, setSongs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [country, setCountry] = useState("US");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_DATA_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_DATA_API_HOST,
      },
    };

    fetch(
      `https://shazam-core.p.rapidapi.com/v1/charts/country?country_code=${country}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSongs(response))
      .then((response) => setFetching(false))
      .catch((err) => console.error(err));
  }, [country]);

  const handleOption = (e) => {
    setFetching(true);
    setSongs([]);
    setCountry(e.target.value);
  };
  if (fetching) return <Loader title={"loading Songs...."} />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-indigo-500 text-left ">
          Country '{country}'
        </h2>
        <select
          onChange={handleOption}
          value={country}
          className="bg-[#2c2f33] font-semibold text-indigo-400 hover:text-indigo-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 cursor-pointer scrollbar-hide"
        >
          {countries.map((country, i) => (
            <option key={i} value={country.value}>
              {country.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <div key={i} className="m-1 mt-[10px] max-w-[320px] md:max-w-[250px]">
            <Card key={i} song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
