const mongoose = require("mongoose");
const express = require("express");
const app = express();
const ejs = require("ejs");

mongoose.connect("mongodb://0.0.0.0:27017/VideojuegosAlmiron", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected!");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

const juegoSchema = new mongoose.Schema({
  nombre: String,
  desarrollo: String,
  precio: String
});

const Juego = mongoose.model('Juego', juegoSchema);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Juego.find()
    .then((juegos) => {
      res.render("index", { juegos: juegos });
    })
    .catch((error) => {
      console.error("Error retrieving users:", error);
      res.status(500).send("Error retrieving users");
    });
});
app.use(express.urlencoded({ extended: true }));

app.post("/juegos", (req, res) => {
  console.log(req.body)
  const nombre = req.body.nombre;
  const desarrollo = req.body.desarrollo;
  const precio = req.body.precio;

  const newJuego = new Juego({
    nombre: nombre,
    desarrollo: desarrollo,
    precio: precio,
  });
  newJuego
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error("Error creating Juego:", error);
      res.status(500).send("Error creating Juego");
    });
});

app.listen(5000, () => {
  console.log("Dynamic web application running on port 5000");
});
