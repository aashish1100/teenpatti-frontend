import { useState, useEffect } from "react";
import { getLedger } from "../api/gameApi";
import { useParams, Link } from "react-router-dom";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Ledger() {
  const { gameId } = useParams();
  const [ledger, setLedger] = useState({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getLedger(gameId).then((res) => {
      setLedger(res.data);
      setPlayers(Object.keys(res.data));
    });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <Card>
          <h2>Ledger</h2>

          <table className="table">
            <thead>
              <tr>
                <th>From ↓ / To →</th>
                {players.map((p) => (
                  <th key={p}>{p}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {players.map((from) => (
                <tr key={from}>
                  <td><b>{from}</b></td>

                  {players.map((to) => (
                    <td key={to}>
                      {from === to ? "—" : ledger[from][to]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <Link to={`/round/${gameId}`}>
            <button className="button" style={{ marginTop: 20 }}>
              Add New Round
            </button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
