import express from "express";

const addPost = async (req, res) => {
  res.status(200).json({ message: "post routes and controllers working fine" });
};

export { addPost };
