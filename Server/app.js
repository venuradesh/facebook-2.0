const express = require("express");
const fileUpload = require("express-fileUpload");
const cors = require("cors");
const mysql = require("mysql");
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("Upload"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "facebook",
});

app.get("/", (req, res) => {
  db.query(`SELECT * FROM posts`, (err, rows) => {
    if (!err) res.status(200).send(rows);
    else res.status(500).send(`Error loading the posts: ${err}`);
  });
});

app.post("/", (req, res) => {
  let uploadPath, extension;
  let images = req.files.photo;
  let imageNameContainer = [];
  let caption = req.body.caption;
  if (images && Array.isArray(images)) {
    images.map((image, index) => {
      extension = image.mimetype.split("/")[1];
      let Name = "facebook_" + Date.now() + `_${index}.${extension}`;
      uploadPath = __dirname + "\\Upload\\" + Name;
      imageNameContainer.push(Name);

      image.mv(uploadPath, (err) => {
        if (err) res.status(400).send("error in uploading images:", err);
      });
    });
  } else {
    if (images) {
      extension = images.mimetype.split("/")[1];
      uploadPath = __dirname + "\\Upload\\" + "facebook_" + Date.now() + `_1.${extension}`;

      images.mv(uploadPath, (err) => {
        if (err) res.status(400).send("error in uploading images:", err);
      });
    }
  }
  console.log("values inserted");
  db.query("INSERT INTO posts(caption, images) VALUES (?,?)", [caption, imageNameContainer.toString()], (err, rows) => {
    imageNameContainer = [];
    if (!err) res.status(200).send("values inserted into database");
    res.status(400).send(`error inserting values: ${err}`);
  });
});

app.listen(port, () => console.log(`connected to port ${port}`));
