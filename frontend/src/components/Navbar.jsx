// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="nav-container">

<div className="nav-left">
  <div className="nav-logo-circle">🥘</div>
  <div className="nav-brand-text">
    <h2 className="nav-title">SmartKitchen</h2>
    <span className="nav-subtitle">Leftovers → smart meals</span>
  </div>
</div>


      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leftovers">Leftovers → Recipe</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/pantry">Pantry</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>

      <div className="nav-auth">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="btn-login" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-register">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
