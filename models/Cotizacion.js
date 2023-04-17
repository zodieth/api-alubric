const { model, Schema } = require("mongoose");

const cotizacionScheme = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 3,
    },
    body: {
      type: String,
      // required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cotizacion", cotizacionScheme);
