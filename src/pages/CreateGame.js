import { useState } from "react";
import { createGame } from "../api/gameApi";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function CreateGame() {
  const [players, setPlayers] = useState([""]);
  const [gameName, setGameName] = useState("");
  const navigate = useNavigate();

  const addPlayer = () => setPlayers([...players, ""]);

  const setPlayer = (v, i) => {
    const copy = [...players];
    copy[i] = v;
    setPlayers(copy);
  };

  const create = async () => {
    const res = await createGame(players, gameName);
    navigate(`/dashboard/${res.data._id}`);
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <Card>
          <h2>Create Game</h2>

          <Input placeholder="Game Name" onChange={(e)=>setGameName(e.target.value)} />

          {players.map((p, i) => (
            <Input key={i} placeholder={`Player ${i+1}`} onChange={(e)=>setPlayer(e.target.value, i)} />
          ))}

          <Button text="Add Player" onClick={addPlayer} />
          <Button text="Start Game" onClick={create} />
        </Card>
      </div>
    </div>
  );
}
