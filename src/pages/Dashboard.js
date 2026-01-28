import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLedger, getRounds, getGameDetails } from "../api/gameApi";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function Dashboard() {
  const { gameId } = useParams();

  const [ledger, setLedger] = useState({});
  const [settlement, setSettlement] = useState({});
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [game, setGame] = useState({});
  const [showLedger, setShowLedger] = useState(false);

  useEffect(() => {
    // Fetch ledger and settlement
    getLedger(gameId).then(res => {
      setLedger(res.data.ledger);
      setSettlement(res.data.settlement);
      setPlayers(res.data.players);
    });

    // Fetch rounds list
    getRounds(gameId).then(res => setRounds(res.data));

    // Fetch game details
    getGameDetails(gameId).then(res => setGame(res.data));
  }, [gameId]);

  return (
    <div>
      <Navbar />

      <div className="container">
        <Card>
          <h2>Game Dashboard</h2>

          <p>
            <b>Game:</b> {game.gameName}
          </p>

          <p>
            <b>Players:</b> {game.players?.join(", ")}
          </p>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <Link to={`/round/${gameId}`}>
              <Button text="Add New Round" />
            </Link>

            <Button text="View Ledger" onClick={() => setShowLedger(true)} />
          </div>

          <h3>Round History</h3>

          {rounds.map((r, i) => (
            <div key={i} className="card" style={{ marginTop: 10 }}>
              <h4>Round {i + 1}</h4>
              <p>
                <b>Winner:</b> {r.winner}
              </p>

              {r.losers.map((l, j) => (
                <p key={j}>
                  {l.name} folded at {l.amount}
                </p>
              ))}
            </div>
          ))}
        </Card>
      </div>

      {/* LEDGER MODAL */}
      {showLedger && (
        <Modal onClose={() => setShowLedger(false)}>
          <h2>Ledger</h2>

          {/* RAW LEDGER */}
          <table className="table" style={{ marginBottom: "30px" }}>
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
                  <td>
                    <b>{from}</b>
                  </td>

                  {players.map((to) => (
                    <td key={to}>
                      {from === to ? "—" : ledger[from][to]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* FINAL NET SETTLEMENT */}
          <h2>Final Settlement</h2>

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
                  <td>
                    <b>{from}</b>
                  </td>

                  {players.map((to) => (
                    <td key={to}>
                      {from === to ? "—" : settlement[from][to]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <Button text="Close" onClick={() => setShowLedger(false)} />
        </Modal>
      )}
    </div>
  );
}
