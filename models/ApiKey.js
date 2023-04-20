const { model, Schema } = require("mongoose");

const apiKeyScheme = new Schema(
  {
    apiKey: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("ApiKey", apiKeyScheme);
