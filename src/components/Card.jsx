import React from "react";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { Snackbar, Alert } from "@mui/material";
import {
  HiOutlineThumbUp,
  HiOutlineSave,
  HiSave,
  HiThumbUp,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import { savedData, usedata } from "../state";
import { currentlyPlaying } from "../state";

const Card = ({ song, i }) => {
  const addData = usedata((state) => state.setData);
  const removeData = usedata((state) => state.removeData);

  const saving = savedData((state) => state.setData);
  const removing = savedData((state) => state.removeData);

  const playing = currentlyPlaying((state) => state.data);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addLike, setaddLike] = useState(false);
  const [closeLike, setcloseLike] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [closeSave, setCloseSave] = useState(false);

  const data = usedata((state) => state.data);
  const savedata = savedData((state) => state.data);

  useEffect(() => {
    data.map((item, i) => {
      if (item.key === song.key) setLiked(true);
    });
  });
  useEffect(() => {
    savedata.map((item, i) => {
      if (item.key === song.key) setSaved(true);
    });
  });

  const addLikeClick = () => {
    setLiked(true);
    addData(song);
    setaddLike(true);
  };

  const removeLikeClick = () => {
    setLiked(false);
    removeData(song.key);
    setcloseLike(true);
  };

  const saveClick = () => {
    setSaved(true);
    saving(song);
    setOpenSave(true);
  };

  const removesaveClick = () => {
    setSaved(false);
    removing(song.key);
    setCloseSave(true);
  };

  const addlikeBarClose = () => {
    setaddLike(false);
  };
  const removelikeBarClose = () => {
    setcloseLike(false);
  };
  const saveClose = () => {
    setOpenSave(false);
  };
  const unSaveClose = () => {
    setCloseSave(false);
  };
  return (
    <>
      <div className="flex flex-col w-[300px] md:w-[140px] p-2 bg-white/10 bg-opacity-80 backdrop-blur-sm rounded-lg ">
        <div className="relative w-full h-45 group">
          <div
            className={`absolute inset-0 justify-center items-center cursor-pointer bg-black bg-opacity-20 hover:bg-opacity-50 ${
              playing?.key === song.key ? "block" : "hidden"
            } hover:block group-hover:flex `}
          >
            <PlayPause key={i} song={song} />
          </div>
          <img src={song?.images?.coverart} alt="song-img" />
        </div>
        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-md tracking-wide text-indigo-500 hover:text-indigo-300 truncate">
            <Link to={`../song-details/${song.key}`}>{song.title}</Link>
          </p>
          <p className="text-sm truncate text-indigo-400 hover:text-indigo-300 mt-1">
            <Link
              to={
                song.artists
                  ? `../artist-details/${song.artists[0]?.adamid}`
                  : "../top-artists"
              }
            >
              {song.subtitle}
            </Link>
          </p>
        </div>
        <div className="flex flex-row justify-between items-center text-gray-300 mt-3">
          {liked ? (
            <HiThumbUp
              className="w-6 h-6 ml-2 cursor-pointer text-indigo-500"
              onClick={removeLikeClick}
            />
          ) : (
            <HiOutlineThumbUp
              className="w-6 h-6 ml-2 cursor-pointer"
              onClick={addLikeClick}
            />
          )}

          {saved ? (
            <HiSave
              className="w-6 h-6 mr-2 cursor-pointer text-indigo-500"
              onClick={removesaveClick}
            />
          ) : (
            <HiOutlineSave
              className="w-6 h-6 mr-2 cursor-pointer"
              onClick={saveClick}
            />
          )}
        </div>
      </div>
      <Snackbar
        open={addLike}
        autoHideDuration={4000}
        onClose={addlikeBarClose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Added to liked tracks!
        </Alert>
      </Snackbar>
      <Snackbar
        open={closeLike}
        autoHideDuration={4000}
        onClose={removelikeBarClose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Removed from liked tracks
        </Alert>
      </Snackbar>
      <Snackbar open={openSave} autoHideDuration={4000} onClose={saveClose}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Saved to Watch Later!
        </Alert>
      </Snackbar>
      <Snackbar open={closeSave} autoHideDuration={4000} onClose={unSaveClose}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Removed from Watch Later
        </Alert>
      </Snackbar>
    </>
  );
};

export default Card;
