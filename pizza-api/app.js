const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  cors({
    origin: "*", // Sadece bu kökenden gelen isteklere izin ver
    // veya origin: '*' // Tüm kökenlerden gelen isteklere izin ver (geliştirme ortamında kullanışlı, üretimde dikkatli olun)
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/pizzas", async (req, res) => {
  const pizzas = await fs.readFile("data/pizzas.json", "utf8");
  res.json(JSON.parse(pizzas));
});

app.post("/orders", async (req, res) => {
  const order = req.body.order;

  if (order === null || order.items === null || order.items.length === 0) {
    return res.status(400).json({ message: "No data sent." });
  }

  if (
    (order.customer.name === null ||
      order.customer.name.trim() === "" ||
      order.customer.email === null ||
      !order.customer.email.includes("@") ||
      order.customer.address === null ||
      order.customer.address.trim() === "" ||
      order.customer.phone === null ||
      order.customer.phone.trim() === "" ||
      order.customer.city === null ||
      order.customer.city.trim() === "",
    order.customer.district === null || order.customer.district.trim() === "")
  ) {
    return res.status(400).json({
      message: "Please fill the form.",
    });
  }

  const newOrder = {
    ...order,
    id: Date.now().toString(),
  };
  const orders = await fs.readFile("data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile("data/orders.json", JSON.stringify(allOrders));
  res.status(201).json({ message: "Order added!" });
});

app.use((req, res) => {
  console.log("your server is ready on http://localhost:3000/pizzas");
  res.status(404).json({ message: "Not found" });
});
console.log("your server is ready on http://localhost:3000/pizzas");
app.listen(3000);
