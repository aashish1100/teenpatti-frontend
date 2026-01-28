import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-title">Teen Patti Tracker</div>
      <Link to="/">
        <button className="button">New Game</button>
      </Link>
    </div>
  );
}
  