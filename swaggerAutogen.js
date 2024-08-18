"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// swagger autogen
// httpps://swagger-autogen.github.io/docs/

require("dotenv").config();
const PORT = process.env?.PORT || 8000;
const HOST = process.env?.PORT || "http://127.0.0.1";

/* ------------------------------------------------------- */

/* ------------------------------------------------------- *
const options = {
    openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
    language:         <string>,     // Change response language.                      By default is 'en-US'
    disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
    autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
    autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
    autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
    writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* ------------------------------------------------------- */

const swaggerAutogen = require("swagger-autogen")();

const packageJson = require("./package.json");

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.name,
    description: packageJson.description,
    // termOfService: 'http://127.0.0.1:8000/#',
    contact: { name: packageJson.author, email: "qaa@cbb.com" },
    license: { name: packageJson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  // SimpleToken Settings:
  // authentication hakkinda bilgi verilmeli.
  securityDefinitions: {
    Token: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Simple Token Authentication * Example: <b>Token ...tokenKey...</b>",
    },
  },
  security: [{ Token: [] }],
  // Model Definitions:
  definitions: {
    Department: require("./src/models/department.model").schema.obj,
    Personnel: require("./src/models/personnel.model").schema.obj,
  },

  // buraya birde path ler yazilacak. swagger autogen burada devreye girecek 

};


const routes = ["./index.js"];
const outputFile = "./swagger.json";

// RUN:
swaggerAutogen(outputFile, routes, document) 