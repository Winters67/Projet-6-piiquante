// -----------importation des dépandances--------------
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const helmet = require("helmet");

// ----------importation des routes-------------------
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

//---------analyse le corps de la requête transforme en  json--------------
app.use(express.json());

// ----------connection à la base de données mongoose--------
mongoose
  .connect(
    "mongodb+srv://Winters:E290380l@cluster0.9vp7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// -----débloque le front et le back de source différente -------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// --------- respecter plus de normes de sécurité---------------
app.use(helmet());

// ------Multer----------------------------------------------------
app.use("/images", express.static(path.join(__dirname, "images")));

// -----routes---------------------
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
