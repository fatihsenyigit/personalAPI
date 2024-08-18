"use strict";

// loglari tutmak icin
const morgan = require("morgan");
const fs = require("node:fs");
// app.use(morgan('tiny'))
// app.use(morgan('Method=":method" - IP=":remote-addr" :remote-addr'))

// day by day
const now = new Date();
const today = now.toISOString().split("T")[0];

/* ------------------------------------------------------- *

bu app.use i burada yazamayiz

app.use(morgan('combined', {
  stream: fs.createWriteStream(`./logs/${today}.log`, {flags:'a+'})
}))

/* ------------------------------------------------------- */

module.exports = morgan("combined", {
  stream: fs.createWriteStream(`./src/logs/${today}.log`, { flags: "a+" })
});
