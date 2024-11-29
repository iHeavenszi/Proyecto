const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const database = require("./src/database");
const bodyParser = require("body-parser");

require('dotenv').config();
const app = express();
app.set("port", 4000);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


//rutas
app.use("/api/signup", require("./src/routes/signup"));
app.use("/api/signout", require("./src/routes/signout"));
app.use("/api/login", require("./src/routes/login"));
app.use("/api/user", require("./src/routes/user"));
app.use("/api/todos", require("./src/routes/todos"));
app.use("/api/refresh-token", require("./src/routes/refreshToken"));

app.get('/', (req, res) => {
    res.send('hello world')
});

//Iniciar servidor
app.listen(app.get("port"), () => {
    console.log("Servidor corriendo en el puerto " + app.get("port"));
  });