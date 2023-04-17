const Cotizacion = require("../models/Cotizacion");
const path = require("node:path");

const getFiles = async () => {
  try {
    const items = await Cotizacion.find();
    return items;
  } catch (error) {
    console.log(error.message);
  }
};

const addFiles = async (firstName, lastName, email, phoneNumber, filePath) => {
  const file = await Cotizacion.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    body,
    fileName: filePath,
  });
  return file;
};

module.exports = { getFiles, addFiles };
