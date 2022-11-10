import Card from "./Card";
import { usedata } from "../state";

const LikedTracks = () => {
  const data = usedata((state) => state.data);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-indigo-500 text-left ">
          Liked Tracks
        </h2>
      </div>
      {data == "" && (
        <span className="text-gray-400 font-bold text-xl my-7">
          No Liked Tracks
        </span>
      )}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((song, i) => (
          <div className="m-1 mt-[10px] max-w-[320px] md:max-w-[250px]">
            <Card key={i} song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedTracks;
