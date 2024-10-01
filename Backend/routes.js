const express = require("express");
const users = require("./models/m2");
const contents = require('./models/models')
const validators = require("./validator");
const { sign } = require("crypto");
const getRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config()


getRouter.post("/SIGNUP", async (req, res) => {
    try {
      const { error, value } = validators.AuthValidator(req.body);
      if (error) {
        res.status(400).json(error.details);
      }else {
        const { username, age, password } = req.body;
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 
        const newUser = new users({
          username,
          country,
          age,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({ newUser });
      }
    } catch (err) {
      console.error(err, "POST error");
      res.status(500).json({ error: "Internal Server Error" });
    }
  });