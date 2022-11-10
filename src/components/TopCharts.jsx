import Card from "./Card";
import useStore from "../state";

const TopCharts = () => {
  const data = useStore((state) => state.data);
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-indigo-500 text-left ">
          Top Tracks
        </h2>
      </div>
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

export default TopCharts;
