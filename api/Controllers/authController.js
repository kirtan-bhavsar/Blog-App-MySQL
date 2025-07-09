import express from "express";

const login = async (req, res) => {
  res.status(200).json({ message: "auth routes and controllers working fine" });
};

export { login };
