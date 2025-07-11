import express from "express";
import db from "../db.js";

const getPosts = async (req, res) => {
  const cat = req.query.cat;

  const getPostsQuery = cat
    ? `select * from posts where cat = ?`
    : `select * from posts`;

  db.query(getPostsQuery, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    return res.status(200).json(data);
  });
};

const addPost = async (req, res) => {
  res.status(200).json({ message: "post routes and controllers working fine" });
};

const getPost = async (req, res) => {
  const getPostQuery = `select u.img as userImage ,uid as postUserId, username, title, p.img as img, description, date from posts p join users u on p.uid = u.id where p.id = ?`;

  db.query(getPostQuery, [req.params.id], (err, data) => {
    if (err) return console.log(err);
    return res.status(200).json(data);
  });
};

const editPost = async (req, res) => {
  res.status(200).json({ message: "post routes and controllers working fine" });
};

const deletePost = async (req, res) => {
  res.status(200).json({ message: "post routes and controllers working fine" });
};

export { addPost, getPost, getPosts, editPost, deletePost };
