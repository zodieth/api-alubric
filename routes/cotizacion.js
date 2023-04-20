const { Router } = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { API_KEY } = process.env;
const express = require("express");
const bodyParser = require("body-parser");
const { addFiles, getFiles, updateFile } = require("../controllers/file");
const fs = require("fs");
const path = require("path");
const cotizacionRouter = Router();
const Cotizacion = require("../models/Cotizacion");
const ApiKey = require("../models/ApiKey");
const crypto = require("crypto");

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
    const apikey = req.query.apikey;
    if (apikey === API_KEY) {
      const files = await getFiles();
      res.json(files);
    } else {
      res.json("Not Allowed");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

cotizacionRouter.get("/download/:filename", (req, res) => {
  const apikey = req.query.apikey;
  if (apikey === API_KEY) {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, "../uploads/", fileName);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(404).send("File not found");
      }
    });
  } else {
    res.json("Not Allowed");
  }
});

cotizacionRouter.post("/file", upload.single("file"), async (req, res) => {
  const { firstName, lastName, email, phoneNumber, body } = req.body;

  const fileName = req.file?.filename;

  try {
    const apikey = req.query.apikey;
    if (apikey === API_KEY) {
      const file = await addFiles(
        firstName,
        lastName,
        email,
        phoneNumber,
        body,
        fileName
      );
      res.status(200).json(file);
    } else {
      res.json("Not Allowed");
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

cotizacionRouter.delete("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;

  console.log(filename);

  fs.unlink(`uploads/${filename}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Failed to delete file" });
    } else {
      res.status(200).send({ message: "File deleted successfully" });
    }
  });
});

cotizacionRouter.put("/file/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const apikey = req.query.apikey;
    if (apikey === API_KEY) {
      console.log(id);
      // const file = await updateFile(id);
      // res.json(file);
      const filter = { _id: id };
      const update = { $set: { active: false } };
      const file = await Cotizacion.updateOne(filter, update);
      res.json(file);
    } else {
      res.json("Not Allowed");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

// cotizacionRouter.post("/api-key", (req, res) => {
//   const apiKey = crypto.randomBytes(20).toString("hex");
//   ApiKey.create(apiKey);

//   res.status(201).json({ apiKey });
// });

module.exports = cotizacionRouter;
