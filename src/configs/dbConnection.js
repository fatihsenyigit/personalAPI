"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose')

const dbConnection = function() {
    // Connect:
    mongoose
      .connect(process.env.MONGODB || "mongodb://127.0.0.1:27017/personelAPI")
      .then(() => console.log("* DB Connected * "))
      .catch((err) => console.log("* DB Not Connected * ", err));
}

/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
} 