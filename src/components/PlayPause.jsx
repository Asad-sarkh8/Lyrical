import { useState, useEffect } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { currentlyPlaying } from "../state";

const PlayPause = ({ song }) => {
  const addData = currentlyPlaying((state) => state.setData);
  const data = currentlyPlaying((state) => state.data);
  const [play, setPlay] = useState(true);
  useEffect(() => {
    if (data?.key === song.key) setPlay(false);
    if (data?.key !== song.key) setPlay(true);
  }, [data]);

  const handlePlay = () => {
    setPlay(false);
    addData(song);
  };

  const handlePause = () => {
    setPlay(true);
    addData([1]);
  };
  return play ? (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  ) : (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  );
};
export default PlayPause;
