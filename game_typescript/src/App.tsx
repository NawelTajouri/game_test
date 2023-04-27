import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

type Game = {
  userId: number;
  game: string;
  playTime: number;
  genre: string;
  platforms: string[];
};

// type GameListProps = {
//   games: Game[];
// };

// const GameList: React.FC<GameListProps> = ({ games }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Game</th>
//           <th>Genre</th>
//           <th>Platform</th>
//           <th>Playtime</th>
//         </tr>
//       </thead>
//       <tbody>
//         {games.map((game) => (
//           <tr key={game.game}>
//             <td>{game.game}</td>
//             <td>{game.genre}</td>
//             <td>{game.platforms}</td>
//             <td>{game.playTime}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

const App: React.FC = () => {
  const [gamesByPlaytime, setGamesByPlaytime] = useState<Game[]>([]);
  const [gamesByPlayers, setGamesByPlayers] = useState<Game[]>([]);
  const [genrePlaytime, setGenrePlaytime] = useState<string>('');
  const [platformPlaytime, setPlatformPlaytime] = useState<string>('');
  const [genrePlayers, setGenrePlayers] = useState<string>('');
  const [platformPlayers, setPlatformPlayers] = useState<string>('');
  const fetchGamesByPlaytime = async () => {
    const res = await axios.get('/select_top_by_playtime', {
      params: {
        genre: genrePlaytime,
        platforms: platformPlaytime,
      },
    });
    setGamesByPlaytime(res.data);
  };
  const fetchGamesByPlayers = async () => {
    const res = await axios.get('/select_top_by_players', {
      params: {
        genre: genrePlayers,
        platforms: platformPlayers,
      },
    });
    setGamesByPlayers(res.data);
  };
  
  
  const handleGenreChangePlaytime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenrePlaytime(e.target.value);
  };
  const handlePlatformChangePlaytime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlatformPlaytime(e.target.value);
  };
  const handleGenreChangePlayers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenrePlayers(e.target.value);
  };
  const handlePlatformChangePlayers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlatformPlayers(e.target.value);
  };

  return (
    <>
      <h1 style={{color: '#007c89', display:"flex", justifyContent:'space-around'}}>Search Games</h1>
      <div style={{display:"flex", justifyContent:'space-evenly'}}>
          <div>
            <h2>Top Games by Playtime</h2>
            <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
              <div>
                
                <input type="text" placeholder="Genre" value={genrePlaytime} onChange={handleGenreChangePlaytime} />
                <input type="text" placeholder="Platform" value={platformPlaytime} onChange={handlePlatformChangePlaytime} />
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'10px'}}>
                <button onClick={fetchGamesByPlaytime}>Search</button>
                </div>
                
                
              </div>
              <div className='fl-table'>
                <table style={{borderCollapse: 'collapse'}}>
                  <thead>
                    <tr>
                      <th>Game</th>
                      <th>Playtime</th>
                      <th>Genre</th>
                      <th>Platforms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gamesByPlaytime.map((game) => (
                      <tr key={game.game}>
                        <td>{game.game}</td>
                        <td>{game.playTime}</td>
                        <td>{game.genre}</td>
                        <td>{game.platforms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div> 
          <div>
            <h2>Top Games by Players</h2>
            <div>
              <div>
                  <input type="text" placeholder="Genre" value={genrePlayers} onChange={handleGenreChangePlayers} />
                  <input type="text" placeholder="Platform" value={platformPlayers} onChange={handlePlatformChangePlayers} />
                  <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'10px'}}>
                  <button onClick={fetchGamesByPlayers}>Search</button>
                  </div>
              </div>
              <div className='fl-table'>
                <table>
                  <thead>
                    <tr>
                      <th>Game</th>
                      <th>Playtime</th>
                      <th>Genre</th>
                      <th>Platforms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gamesByPlayers.map((game) => (
                      <tr key={game.game}>
                        <td>{game.game}</td>
                        <td>{game.playTime}</td>
                        <td>{game.genre}</td>
                        <td>{game.platforms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div> 
    </>)
};
export default App;