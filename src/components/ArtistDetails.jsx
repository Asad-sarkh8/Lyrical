import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
// import { Link } from "react-router-dom";
import Loader from "./Loader";

const ArtistDetails = () => {
  const { id } = useParams();
  const divRef = useRef(null);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);

  // useEffect(() => {
  // divRef.current.scrollIntoView({ behavior: "smooth" });

  // });

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_DATA_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_DATA_API_HOST,
      },
    };

    fetch(
      `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response.data))
      .then((response) => setFetching(false))
      .catch((err) => console.error(err));
  }, [id]);
  console.log(data);
  if (fetching) return <Loader title={"loading Details...."} />;
  return (
    <div className="flex flex-col" ref={divRef}>
      {data.map((dat, i) => (
        <div key={i}>
          <h2 className="text-indigo-500 tracking-wider text-2xl font-bold mt-7">
            Artist Details:
          </h2>

          <div className="flex flex-row items-center">
            <img
              className="w-20 h-20 rounded-lg my-7"
              src={dat?.attributes.artwork.url}
              alt="coverart"
            />
            <div className="flex flex-col ml-3">
              <p className="text-2xl tracking-wider font-bold text-white">
                {dat?.attributes.name}
              </p>
              <p className="text-lg tracking-wider font-semibold text-gray-300">
                {dat?.attributes.origin}
              </p>
            </div>
          </div>

          <h2 className="text-indigo-500 tracking-wider text-2xl font-bold mt-3">
            Bio:
          </h2>
          <p className="text-gray-400 text-base my-1">
            {dat?.attributes.artistBio}
          </p>

          <h2 className="text-indigo-500 tracking-wider text-2xl font-bold my-7">
            Top Songs
          </h2>
          {dat?.views?.["top-songs"].data.map((item, i) => (
            <div className="w-full flex flex-row items-center hover:bg-indigo-500 p-4 py-2 rounded-lg mb-1">
              <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
              <div className="flex-1 flex flex-row justify-between items-center">
                <img
                  className="md:w-20 w-10 h-10 md:h-20 rounded-lg"
                  src={item?.attributes.artwork.url}
                  alt="cover"
                />
                <div className="flex-1 flex flex-col justify-center mx-3 ">
                  <p className="text-xl font-bold text-white truncate ">
                    {/* <Link to={`/account/song-details/${item.id}`}> */}
                    {item?.attributes.name}
                    {/* </Link> */}
                  </p>
                  <p className="text-base font-normal text-gray-300 mt-1">
                    {item?.attributes.artistName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {window.scrollTo({ top: 0, behavior: "smooth" })}
    </div>
  );
};

export default ArtistDetails;
