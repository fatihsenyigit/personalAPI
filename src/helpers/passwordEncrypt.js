"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// passwordEncrypt():

const crypto = require("node:crypto"),
  keyCode = process.env.SECRET_KEY || "wertyu45",
  loopCount = 10000,
  charCount = 32,
  encType = "sha512";

module.exports = function (password) {
    return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex')
}