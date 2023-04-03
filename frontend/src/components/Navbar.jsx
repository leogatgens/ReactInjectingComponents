import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <div className="menu">
      <Link to="/">
        <h2>Galería</h2>
      </Link>
      <Link to="/upload">
        <h2>Subir Imagen</h2>
      </Link>
    </div>
  );
};

export default Navbar;
