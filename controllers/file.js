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

const addFiles = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  body,
  filePath
) => {
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

const updateFile = async (id) => {
  const filter = { _id: id };
  const update = { $set: { active: false } };

  const file = await Cotizacion.updateOne(filter, update);
  return file;
};

module.exports = { getFiles, addFiles, updateFile };
