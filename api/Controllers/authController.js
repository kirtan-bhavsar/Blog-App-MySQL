import express from "express";
import db from "../db.js";
import bcrypt from "bcrypt";
import generateToken from "../Utils/generateToken.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  username.trim();
  email.trim();
  password.trim();
  // check if the email follows correct regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "🤡 That’s not a real email… unless you live in Narnia",
    });
  }

  // check if the customer already exits
  const checkExistingCustomerQuery = `select username,email from users where username = ? or email = ?`;
  db.query(checkExistingCustomerQuery, [username, email], async (err, data) => {
    if (err) return console.log(err);
    if (data.length >= 1)
      return res
        .status(409)
        .json({ message: "🙃 Wow, so original. That user already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const registerCustomerQuery =
      "insert into users (username,email,password) values(?)";
    const body = [username, email, hashedPassword];
    db.query(registerCustomerQuery, [body], (err, data) => {
      if (err) return console.log(err);
      return res
        .status(200)
        .json({ data: body, message: "User registered successfully" });
    });
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  username.trim();
  password.trim();

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Bold move trying to log in without credentials." });
  }

  // check if the user exits
  const checkExistingCustomerQuery = `select id,username,password from users where username = ?`;

  db.query(checkExistingCustomerQuery, [username], (err, data) => {
    if (err) return console.log(err);
    if (data.length === 0)
      return res.status(401).json({
        message: "We searched. We cried. But no such user was found.",
      });

    // check if the password matches
    const isCorrectPassword = bcrypt.compareSync(password, data[0].password);

    if (!isCorrectPassword) {
      return res.status(401).json({
        message: "🙃 Invalid Credentials. But your confidence? Impressive",
      });
    }

    generateToken(data[0], req, res);
  });
};

const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({
      message: "🖥️Thank you for reducing our server load. Much appreciated.",
    });
};

export { register, login, logout };
