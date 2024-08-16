"use strict";

const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      const user = await Personnel.findOne({ username });
      console.log(user);
      if (user && user.password == passwordEncrypt(password)) {
        if(user.isActive) {
            // token varmi
            let tokenData = await Token.findOne({userId: user._id})

            // token yoksa olustur
            if(!tokenData) {
                tokenData = await Token.create({
                    userId: user._id,
                    token: passwordEncrypt(user._id + Date.now())
                })
            }

            res.status(200).send({
                error: false,
                token: tokenData.token,
                user
            })

        } else {
            res.errorStatusCode = 401
            throw new Error('this user is not active')
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("wrong username or password");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("please enter usename and password");
    }
  },

  logout: async (req, res) => {
    
  },
};
