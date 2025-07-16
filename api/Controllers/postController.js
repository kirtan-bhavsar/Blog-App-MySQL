import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const getPosts = async (req, res) => {
  console.log("getPosts called ");

  const cat = req.query.cat;

  // updated code starts
  const page = req.query.page || 1;
  console.log(page);
  const offset = (page - 1) * 5;
  console.log(offset);
  // updated code ends

  const getPostsQuery = cat
    ? `select SQL_CALC_FOUND_ROWS * from posts where cat = ? order by date desc limit 5 offset ${offset} ; select FOUND_ROWS() as totalPosts`
    : `select SQL_CALC_FOUND_ROWS * from posts order by date desc limit 5 offset ${offset} ; select FOUND_ROWS() as totalPosts`;
  // ? `select * from posts where cat = ?`
  // : `select * from posts`;

  db.query(getPostsQuery, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    return res.status(200).json({ data, currentPage: page });
  });
};

const addPost = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(400).json({ message: "User not authrized" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) return res.status(400).json({ message: "Token is not valid" });
    const uid = data.user.id;

    const addPostQuery = `insert into posts (title,description,img,date,uid,cat) values (?)`;

    const { description, title, img, date, cat } = req.body;
    console.log(req.body);
    console.log("req.body");

    // const values = [description, title, img, date, cat, uid];
    const values = [title, description, img, date, uid, cat];
    console.log(values);
    console.log("values");

    db.query(addPostQuery, [values], (err, data) => {
      if (err)
        return res.status(500).json({ message: "Internal Server Error" });
      res.status(200).json({ message: "Post added successfully" });
    });
  });
};

const getPost = async (req, res) => {
  const getPostQuery = `select p.id,u.img as userImage ,uid as postUserId, username,cat, title, p.img as img, description, date from posts p join users u on p.uid = u.id where p.id = ?`;

  db.query(getPostQuery, [req.params.id], (err, data) => {
    if (err) return console.log(err);
    return res.status(200).json(data);
  });
};

const editPost = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(400).json({ message: "User not authrized" });

  console.log(req.params.id);
  console.log("req.params.id");

  db.query(`select * from posts where id = ?`, [req.params.id], (err, data) => {
    if (err) return console.log(err);
    const postUserId = data[0].uid;

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) return res.status(400).json({ message: "Token is not valid" });
      const userId = data.user.id;

      const editPostQuery =
        "update posts set `title`=? ,`description`=? ,`cat`=? ,`img`=? where `id` = ? and `uid` = ?";

      const { description, title, img, cat } = req.body;

      const postId = Number(req.params.id);

      const values = [title, description, cat, img, postId, userId];
      console.log(values);
      console.log("values");

      db.query(editPostQuery, values, (err, data) => {
        if (err) {
          console.log(err);
          return res
            .status(401)
            .json({ message: "User not authorized to peform this action" });
        }
        // console.log(data);
        // console.log("data from inside the delete query");
        if (userId !== postUserId)
          return res.status(401).json({
            message:
              "User not authorized to perform this action as user ids does not match",
          });
        return res.status(200).json({ message: "Post edited successfully" });
      });
    });
  });
};

const deletePost = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(400).json({ message: "User not authrized" });

  db.query(`select * from posts where id = ?`, [req.params.id], (err, data) => {
    if (err) return console.log(err);
    const postUserId = data[0].uid;

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) return res.status(400).json({ message: "Token is not valid" });
      const userId = data.user.id;

      const deletePostQuery = `delete from posts where uid = ? and id = ?`;

      db.query(deletePostQuery, [data.user.id, req.params.id], (err, data) => {
        if (err)
          return res
            .status(401)
            .json({ message: "User not authorized to peform this action" });
        // console.log(data);
        // console.log("data from inside the delete query");
        if (userId !== postUserId)
          return res.status(401).json({
            message:
              "User not authorized to perform this action as user ids does not match",
          });
        return res.status(200).json({ message: "Post deleted successfully" });
      });
    });
  });
};

const like = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(400).json({ message: "User not authrized" });

  const { postId, postedByUser } = req.params;

  console.log(postId);
  console.log("postId");
  console.log(postedByUser);
  console.log("postedByUser");

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) res.status(400).json({ message: "Invalid token" });

    const likedByUser = data.user.id;

    const likePostQuery = `
    start transaction;

    insert into likes (postId,postedByUser,likedByUser) values (?);

    update posts set likesCount = (select count(*) as count from likes where postId = ?) where id = ?;

    commit;
    `;

    db.query(
      likePostQuery,
      [[postId, postedByUser, likedByUser], postId, postId],
      async (err, data) => {
        if (err) return console.log(err);
        console.log(data);
        console.log("data");
        res.status(200).json({ message: "Post liked successfully" });
      }
    );
  });
};

export { addPost, getPost, getPosts, editPost, deletePost, like };
