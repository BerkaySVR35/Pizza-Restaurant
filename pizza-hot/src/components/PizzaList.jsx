import { useEffect, useState } from "react";
import Pizza from "./Pizza";
import Loading from "./Loading";
import useFetch from "../hooks/useFetch";

const config = {
  method: "GET",
};

export default function PizzaList() {
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/pizzas",
    config,
    []
  );
  if (isLoading) {
    return <div className="alert alert-warning">Yükleniyor...</div>;
  }
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  return (
    <>
      {isLoading ? (
        <Loading error={error} />
      ) : (
        <div className="pizza-list">
          <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
            {data.map((pizzaItem) => (
              <Pizza pizzas={pizzaItem} key={pizzaItem.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
