import { useEffect, useState } from "react";
import Pizza from "./Pizza";
import Loading from "./Loading";

export default function PizzaList() {
  const [loading, setLoading] = useState(false);
  const [loadedPizzas, setLoadedPizzas] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getPizzaList() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/pizzas");

        if (!res.ok) {
          // error log
          throw new Error("Bilinmeyen bir hata oluştu.");
        }
        const data = await res.json();
        setLoadedPizzas(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      setLoading(false);
    }

    getPizzaList();

    console.log(loadedPizzas);
  }, []);

  return (
    <>
      {loading ? (
        <Loading error={error} />
      ) : (
        <div className="pizza-list">
          <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
            {loadedPizzas.map((pizzaItem) => (
              <Pizza pizzas={pizzaItem} key={pizzaItem.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
