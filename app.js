require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const User = require("./model/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

app.use(express.json());

app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("Todos os campos são obrigatórios!");
      }

      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.token))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        user.token = `JWT ${token}`;

        res.status(200).json(user);
      }
      res.status(400).send("Credenciais inválidas");
    } catch (err) {
      console.log(err);
    }
  });
  
module.exports = app;