const express = require("express");
const fileUpload = require("express-fileUpload");
const cors = require("cors");
const mysql = require("mysql");
const uniqId = require("uniqid");
const bcrypt = require("bcrypt");
const saltNumber = 10;
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use("/", express.static("Upload"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "facebook",
});

app.get("/posts", (req, res) => {
  db.query(`SELECT * FROM posts`, (err, rows) => {
    if (!err) res.status(200).send(rows);
    else res.status(400).send(`Error loading the posts: ${err}`);
  });
});

app.post("/like", (req, res) => {
  console.log(req.body);
});

app.post("/create", (req, res) => {
  const details = req.body;
  bcrypt.hash(details.password, saltNumber, (err, hash) => {
    if (err) res.status(400).send(err);
    db.query("INSERT INTO info( id,FirstName, lastName, mobile_no, gender, email, dob, password) VALUES(?,?,?,?,?,?,?,?);", [uniqId(), details.firstName, details.lastName, details.mobileNumber, details.gender, details.email, details.dob, hash], (err) => {
      if (err) {
        res.send(err);
      } else res.status(200).send("OK");
    });
  });
});

app.post("/compare", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM info WHERE email=?", email, (err, result) => {
    if (err) res.send({ err });
    else {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) console.log(err);
        else {
          if (response) {
            res.status(200).send({ response, user: result[0] });
          } else {
            res.status(200).send({ response });
          }
        }
      });
    }
  });
});

app.post("/", (req, res) => {
  let uploadPath, extension, Name, images, caption;
  req.files ? (images = req.files.photo) : null;
  let imageNameContainer = [];
  req.body.caption ? (caption = req.body.caption) : "";
  let imagesAvailable = false;
  if (images && Array.isArray(images)) {
    images.map((image, index) => {
      extension = image.mimetype.split("/")[1];
      Name = "facebook_" + Date.now() + `_${index}.${extension}`;
      uploadPath = __dirname + "\\Upload\\" + Name;
      imageNameContainer.push(Name);

      image.mv(uploadPath, (err) => {
        if (err) res.status(400).send("error in uploading images:", err);
      });
    });
  } else {
    if (images) {
      extension = images.mimetype.split("/")[1];
      uploadPath = __dirname + "\\Upload\\" + "facebook_" + Date.now() + `_0.${extension}`;
      Name = "facebook_" + Date.now() + `_0.${extension}`;
      imageNameContainer.push(Name);
      images.mv(uploadPath, (err) => {
        if (err) res.status(400).send("error in uploading images:", err);
      });
    }
  }
  if (imageNameContainer.length !== 0) {
    imagesAvailable = true;
  }
  db.query("INSERT INTO posts(caption, images) VALUES (?,?)", [caption, imagesAvailable ? imageNameContainer.toString() : ""], (err, rows) => {
    imageNameContainer = [];
    if (!err) {
      imageNameContainer = [];
      caption = "";
      res.status(200).send("values inserted into database");
    } else res.status(400).send(`error inserting values: ${err}`);
  });
});

app.listen(port, () => console.log(`connected to port ${port}`));
