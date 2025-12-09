import { Link } from "react-router-dom";
import "../index.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-left">
        <h1 className="home-title">
          Turn <span>Leftovers</span> into meals 🍽️
        </h1>

        <p className="home-subtitle">
          SmartKitchen helps you convert leftover ingredients into delicious meals instantly.<br></br><br></br>
          Reduce waste, save money, cook creatively.
        </p>

        <div className="home-buttons">
          <Link to="/leftovers" className="btn-primary">Start Cooking</Link>
          <Link to="/recipes" className="btn-outline">Explore Recipes</Link>
        </div>

        <p className="create-account-text">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </div>

      <div className="home-image-container">
        <img
          className="home-image"
          src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
          alt="Food"
        />
      </div>
    </div>
  );
}
