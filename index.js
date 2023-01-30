const express = require("express");
const multer = require("multer");
const mimeTypes = require("mime-types");
const fs = require("fs");
const { config } = require('./config');

const app = express();
const port = config.port;
const path = config.path;

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, res, cb) => {
    cb("", Date.now() + "." + mimeTypes.extension(res.mimetype));
  },
});

const upload = multer({
  storage,
});

app.get(`${path}/:name`, (req, res) => {
  const { name } = req.params;
  res.sendFile(__dirname + "/uploads/" + name);
});

app.post(path, upload.single("avatar"), (req, res) => {
  res.send({
    message: "Correct",
  });
});

app.delete(`${path}/:name`, (req, res) => {
  const { name } = req.params;
  fs.unlink(__dirname + "/uploads/" + name, (r) => {
    res.send({ message: r });
  });
});

app.listen(port,()=> console.log('localhost:'+port));
