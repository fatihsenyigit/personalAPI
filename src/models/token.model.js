"use strict";

const { mongoose } = require("../configs/dbConnection");

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel",
      required: true,
      index: true
    },

    token: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    }
  },
  {
    collection: "tokens",
    timestamps: true,
  },
);


module.exports = mongoose.model('Token', TokenSchema)

/* {
  "userId": "66bb4a7e70dc0f2514c77106",
  "token": "wertyu66"
} */