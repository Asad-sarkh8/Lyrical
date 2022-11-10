import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Loader from "./Loader";

const SongDetails = () => {
  const { id } = useParams();
  const [lyrics, setLyrics] = useState();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_DATA_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_DATA_API_HOST,
      },
    };

    fetch(
      `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setLyrics(response))
      .then((response) => setFetching(false))
      .catch((err) => console.error(err));
  }, [id]);

  if (fetching) return <Loader title={"loading Lyrics...."} />;
  return (
    <div className="flex flex-col">
      <h2 className="text-indigo-500 text-2xl font-bold mt-7">Song Details:</h2>
      <div className="flex flex-row items-center">
        <img
          className="w-20 h-20 rounded-lg my-7"
          src={lyrics?.images?.coverart}
          alt="coverart"
        />
        <div className="flex flex-col ml-3">
          <p className="text-2xl font-bold truncate text-white ">
            {lyrics?.title}
          </p>
          {/* <Link to={`../artist-details/${lyrics?.artists?.adamid}`}> */}
          <p className="text-lg font-semibold truncate text-indigo-400 cursor-pointer hover:text-indigo-300">
            {lyrics?.subtitle}
          </p>
          {/* </Link> */}
          <p className="text-sm font-semibold text-gray-300">
            {lyrics?.genres?.primary}
          </p>
        </div>
      </div>
      <h2 className="text-indigo-500 text-2xl font-bold">Lyrics:</h2>
      <div className="mt-5">
        {lyrics.detail !== "Object not found" &&
        lyrics?.sections[1]?.type === "LYRICS" ? (
          lyrics?.sections[1]?.text.map((line, i) => (
            <p key={i} className="text-gray-400 text-base my-1">
              {line}
            </p>
          ))
        ) : (
          <p className="text-gray-400 text-base my-1">Sorry. No Lyrics found</p>
        )}
      </div>
      {window.scrollTo({ top: 0, behavior: "smooth" })}
    </div>
  );
};

export default SongDetails;
