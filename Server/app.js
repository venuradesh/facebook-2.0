const express = require("express");
const fileUpload = require("express-fileUpload");
const cors = require("cors");
const mysql = require("mysql");
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "facebook",
});

app.get("/", (req, res) => {
  db.query(`SELECT * FROM info`, (err, rows) => {
    if (!err) res.send(rows);
    else console.error(err);
  });
});

app.listen(port, () => console.log(`connected to port ${port}`));
