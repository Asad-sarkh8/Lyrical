import { Link } from "react-router-dom";
import useStore from "../state";

const TopArtists = () => {
  const data = useStore((state) => state.data);
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-indigo-500 text-left ">
          Top Artists
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((song, i) => (
          <div className="m-1 mt-[10px] max-w-[320px] md:max-w-[250px]">
            <div className="flex flex-col w-[300px] md:w-[140px] p-2 bg-white/10 bg-opacity-80 backdrop-blur-sm transition-all rounded-lg cursor-pointer ">
              <div className="relative w-full h-45 group">
                <Link
                  to={
                    song
                      ? `../artist-details/${song?.artists[0]?.adamid}`
                      : "../top-artists"
                  }
                >
                  <img src={song?.images.background} alt="artist-img" />
                </Link>
              </div>
              <div className="mt-3 flex flex-col">
                <p className="text-lg truncate text-indigo-400 hover:text-indigo-300 ">
                  <Link
                    to={
                      song
                        ? `../artist-details/${song?.artists[0]?.adamid}`
                        : "../top-artists"
                    }
                  >
                    {song?.subtitle}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
