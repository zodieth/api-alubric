const { Router } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const { addFiles, getFiles } = require("../controllers/file");
const fs = require("fs");
const path = require("path");
const cotizacionRouter = Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

cotizacionRouter.use(bodyParser.json());

cotizacionRouter.get("/file", async (req, res) => {
  try {
    const files = await getFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

cotizacionRouter.post("/file", upload.single("file"), async (req, res) => {
  const { firstName, lastName, email, phoneNumber, body } = req.body;

  const filePath = req.file?.path;

  try {
    const file = await addFiles(
      firstName,
      lastName,
      email,
      phoneNumber,
      body,
      filePath
    );
    res.status(200).json(file);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

// cotizacionRouter.delete("/upload/:filename", (req, res) => {
//   const filePath = path.join(__dirname, "/uploads/", req.params.filename);

//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send({ message: "Failed to delete file" });
//     } else {
//       res.status(200).send({ message: "File deleted successfully" });
//     }
//   });
// });

module.exports = cotizacionRouter;
