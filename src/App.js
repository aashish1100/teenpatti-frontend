import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameList from "./pages/GameList";
import CreateGame from "./pages/CreateGame";
import Dashboard from "./pages/Dashboard";
import AddRound from "./pages/AddRound";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/dashboard/:gameId" element={<Dashboard />} />
        <Route path="/round/:gameId" element={<AddRound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
