import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStepBackward,
  faStepForward,
  faPause,
  faVolumeOff,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return { ...song, active: true };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  // Ref - Can't use querySelector, use ref instead
  const audioRef = useRef(null);

  //Event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const [volume, setVolume] = useState(0.5);
  const volumeUpdateHandler = (e) => {
    audioRef.current.volume = volume;
    setVolume(e.target.value);
  };

  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      setCurrentSong(
        songs[(currentIndex - 1) % songs.length] || songs[songs.length - 1]
      );
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div
            className="animate-track"
            style={{
              transform: `translateX(${animationPercentage}%)`,
            }}
          ></div>
        </div>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="volume">
        <FontAwesomeIcon icon={faVolumeOff} className="volume-off" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={volumeUpdateHandler}
        />
        <FontAwesomeIcon icon={faVolumeUp} className="volume-up" />
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faStepBackward}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay} // ? = if, : = else
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faStepForward}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedData={autoPlayHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={() => skipTrackHandler("skip-forward")}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
