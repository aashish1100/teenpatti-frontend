import { useEffect, useState } from "react";
import { getAllGames } from "../api/gameApi";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames().then(res => setGames(res.data));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>All Games</h2>

        {games.map((g) => (
          <Card key={g._id} style={{ marginTop: 10 }}>
            <h3>{g.gameName || "Teen Patti Game"}</h3>
            <p>Players: {g.players.join(", ")}</p>
            <p>Rounds Played: {g.rounds.length}</p>

            <Link to={`/dashboard/${g._id}`}>
              <button className="button">Open Game</button>
            </Link>
          </Card>
        ))}

        <Link to="/create">
          <button className="button">Create New Game</button>
        </Link>
      </div>
    </div>
  );
}
