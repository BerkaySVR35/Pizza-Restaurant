import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";

export default function Pizza({ pizzas }) {
  const { color } = useContext(ThemeContext);
  const { addItem } = useContext(CartContext);

  function handleAddItem() {
    addItem(pizzas);
  }
  return (
    <div className="col">
      <div className="card item">
        <img
          src={`http://localhost:3000/images/${pizzas.image}`}
          alt="Sucuk Mısır"
          className="card-img-top p-2 p-md-3 border-bottom"
        />
        <div className="card-body">
          <h3 className="card-title">{pizzas.title}</h3>
          <p className="card-text">{pizzas.description}</p>
          <div className="item-price">
            <b>{pizzas.price} ₺</b>
            <button
              className={`btn btn-sm btn-outline-${color}`}
              onClick={handleAddItem}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
