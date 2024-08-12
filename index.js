"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const { dbConnection, mongoose } = require("./src/configs/dbConnection");
const app = express();

/* ------------------------------------------------------- */

// env variables

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// async errors
require("express-async-errors");

// db connection
dbConnection();

//body parser
app.use(express.json());

// middlewares
app.use(require("./src/middlewares/findSearchSortPage"));

//homePath
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "welcome to personal api",
    session: req.session,
    isLogin: req.isLogin,
  });
});

// routes
app.use("/departments", require("./src/routes/department.router"));
app.use("/personels", require("./src/routes/personnel.router"));
app.use('/auth', require('./src/routes/auth.router'))

app.all("*", async (req, res) => {
  res.status(404).send({
    error: true,
    message: "route not available",
  });
});

//cokies xxs cross side searching
app.use(
  require("cookie-session")({
    secret: process.env.SECRET_KEY || "wertyu45",
    // daha guvenli hale getirmek icin yani https deki s gibi
    // cookie: {
    //     secure:!(process.env.NODE_ENV == 'development'),
    //     httpOnly: false,
    //     maxAge: 24 * 60 * 60
    // }
  }),
);

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()

// if (process.env.NODE_ENV == "development") {
//   require("./src/helpers/dataCreate")()
//     .then((res) => console.log("data synched"))
//     .catch((err) => console.log("could not snychedd"));
// }
 