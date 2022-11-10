import Card from "./Card";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const Search = () => {
  const { searchTerm } = useParams();
  const [fetching, setFetching] = useState(true);

  const [data, setData] = useState({});

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_DATA_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_DATA_API_HOST,
      },
    };

    fetch(
      `https://shazam-core.p.rapidapi.com/v1/search/multi?query=${searchTerm}&search_type=SONGS_ARTISTS`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .then((response) => setFetching(false))
      .catch((err) => console.error(err));
  }, [searchTerm]);
  if (fetching) return <Loader />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-indigo-500 text-left ">
          Results " <span className="text-gray-300">{searchTerm}</span> "
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.hits.map((song, i) => (
          <div className="m-1 mt-[10px] max-w-[320px] md:max-w-[250px]">
            <Card key={i} song={song.track} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
