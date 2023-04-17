// import mongoose from "mongoose";
// import * as dotenv from 'dotenv'

require("dotenv").config()
const mongoose = require("mongoose")

dotenv.config()
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env;

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.error('Error connection to MongoDB', error.message)
})