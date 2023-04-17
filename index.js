const dotenv = require("dotenv");
dotenv.config();
const { PORT, CLIENT_ORIGIN_URL } = process.env;
const express = require("express");
const cors = require("cors");
const db =require('./db')
const cotizacionRouter = require('./routes/cotizacion')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400, //Tal vez convenga reducirlo...
  })
);

app.use('/',cotizacionRouter)


app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

module.exports = app;