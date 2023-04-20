const dotenv = require("dotenv");
dotenv.config();
const { PORT, CLIENT_ORIGIN_URL } = process.env;
const express = require("express");
const cors = require("cors");
require("./db");
const cotizacionRouter = require("./routes/cotizacion");

const app = express();

app.use(express.urlencoded({ extended: true }));
// app.use((_req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(cors());

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400, //Tal vez convenga reducirlo...
  })
);

app.use("/", cotizacionRouter);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

module.exports = app;
