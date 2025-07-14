import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";

export default function Header() {
  const { color, changeColor, mode } = useContext(ThemeContext);
  const { items } = useContext(CartContext);
  const totalCartItems = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <header>
      <nav
        onClick={changeColor}
        className={`navbar navbar-expand bg-${color} ${
          mode === "dark" ? "text-dark" : "text-light"
        } border-bottom border-body`}
        data-bs-theme={mode === "dark" ? "dark" : "light"}
      >
        <div className="container">
          <a href="#" className="navbar-brand">
            🍕 Pizza Hot
          </a>

          <button className="btn btn-dark">
            <i className="bi bi-cart3"></i>
            <span className="ms-2">({totalCartItems})</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
