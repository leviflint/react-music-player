import {useState} from 'react'
import "./Styles/app.scss";
import data from "./util";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from './components/Library'

function App() {

  // State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0]) // 0 is grabbing the first song from the array of songs.
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
      <Library setSongs={setSongs} songs={songs} setCurrentSong={setCurrentSong}/>
    </div>
  );
}

export default App;
