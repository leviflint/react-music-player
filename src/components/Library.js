import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setSongs, setCurrentSong }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            song={song}
            id={song.id}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
