import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { addRound } from "../api/gameApi";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";

export default function AddRound() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState("");
  const [losers, setLosers] = useState([]);

 useEffect(() => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/game/${gameId}/ledger`)
    .then(res => {
      const names = res.data.players;   // FIX ✔
      setPlayers(names);

      // Reset losers list with all players, amount = 0
      setLosers(names.map(name => ({ name, amount: 0 })));
    })
    .catch(err => console.error(err));
}, [gameId]);



  const submit = async () => {
    const valid = losers.filter(l => l.name !== winner && l.amount > 0);
    await addRound(gameId, { winner, losers: valid });
    navigate(`/dashboard/${gameId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Card>
          <h2>Add Round</h2>

          <select className="input" onChange={(e)=>setWinner(e.target.value)}>
            <option>Select Winner</option>
            {players.map(p => <option key={p}>{p}</option>)}
          </select>

          <h4>Fold Amounts</h4>

          {losers.map((l, i) => (
            <div key={i}>
              <label>{l.name}</label>
              <Input
                type="number"
                placeholder="Amount"
                onChange={(e)=>{
                  const copy = [...losers];
                  copy[i].amount = Number(e.target.value);
                  setLosers(copy);
                }}
              />
            </div>
          ))}

          <Button text="Submit Round" onClick={submit} />
        </Card>
      </div>
    </div>
  );
}
