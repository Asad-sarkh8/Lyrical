import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import PlayPause from "./PlayPause";
import useStore, { currentlyPlaying } from "../state";
import Player from "./Player";

const TopPlay = () => {
  const divRef = useRef(null);
  const [data, setData] = useState([]);

  const topPlays = data?.slice(0, 4);

  const datas = currentlyPlaying((state) => state.data);
  const setdatas = useStore((state) => state.setData);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_DATA_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_DATA_API_HOST,
      },
    };

    fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, []);

  const TopChartCard = ({ song, i }) => (
    <div className="w-full flex flex-row items-center hover:bg-indigo-500 p-4 py-2 rounded-lg cursor-pointer mb-1">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-10 h-10 rounded-lg"
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3 ">
          <p className="text-xl font-bold text-white truncate ">
            <Link to={`./song-details/${song.key}`}>{song?.title}</Link>
          </p>
          <p className="text-base font-normal text-gray-300 mt-1">
            <Link to={`./artist-details/${song?.artists[0].adamid}`}>
              {song?.subtitle}
            </Link>
          </p>
        </div>
      </div>
      <PlayPause key={i} song={song} />
    </div>
  );

  useEffect(() => {
    setdatas(data);
  }, [data]);
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-indigo-500 text-2xl">Top Charts</h2>
          <Link to="/account/top-charts">
            <p className="text-indigo-400 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard song={song} i={i} key={song.key} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-indigo-500 text-2xl">Top Artists</h2>
          <Link to="/account/top-artists">
            <p className="text-indigo-400 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "20%", height: "auto" }}
              className="shadow-lg rounded-full animate-sliderlight cursor-pointer"
            >
              <Link to={`./artist-details/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {datas[0] !== 1 && (
        <footer className=" backdrop-blur-xl text-3xl text-white text-center fixed md:inset-x-60 inset-x-0 bottom-0 p-3 ">
          <Player data={datas} />
        </footer>
      )}{" "}
    </div>
  );
};

export default TopPlay;
