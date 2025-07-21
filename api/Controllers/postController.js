import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const getPosts = async (req, res) => {
  // console.log("getPosts called ");

  const cat = req.query.cat;

  // pagination logic
  const page = req.query.page || 1;
  console.log(page);
  const offset = (page - 1) * 5;
  console.log(offset);
  // pagination logic ends

  // sort logic

  //  sort options : oldest,newest,most liked, least liked

  const sort = req.query.sort;

  const order =
    sort === "newest" || sort === "most-liked" ? "desc" : "asc" || "desc";

  const orderType =
    sort === "oldest" || sort === "newest" ? "date" : "likesCount" || "date";

  // console.log(order);
  // console.log(orderType);

  // need to define order by and ascending or descending

  // for oldest : order by date asc
  // for newest : order by date desc
  // for most-liked : order by likesCount desc
  // for least-liked : order by likesCount asc

  // sort logic ends

  const getPostsQuery = cat
    ? // ? `select SQL_CALC_FOUND_ROWS * from posts where cat = ? order by date desc limit 5 offset ${offset} ; select FOUND_ROWS() as totalPosts`
      `select SQL_CALC_FOUND_ROWS * from posts where cat = ? order by ${orderType} ${order} limit 5 offset ${offset} ; select FOUND_ROWS() as totalPosts`
    : // : `select SQL_CALC_FOUND_ROWS * from posts order by date desc limit 5 offset ${offset} ; select FOUND_ROWS() as totalPosts`;
      `select SQL_CALC_FOUND_ROWS * from posts order by ${orderType} ${order} limit 5 offset ${offset} ; select FOUND_ROWS() as totalPosts`;
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
  const token = req.cookies.acessToken;
  if (!token)
    return res
      .status(400)
      .json({ message: "User not authrized to perform this action" });

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return res.status(400).json({ message: "Invalid token" });

    const userId = data.user.id;
    const postId = req.params.id;

    const checkIfLiked = `select * from likes where postId = ? and likedByUser = ?`;

    let ifPostLiked;

    db.query(checkIfLiked, [postId, userId], (err, data) => {
      if (err) return console.log(err);
      ifPostLiked = data.length > 0;
      // console.log(ifPostLiked);
      // console.log("ifPostLiked");
      // console.log("ifPostLiked");

      // const getPostQuery = `select p.commentsCount as commentsCount,p.likesCount as likesCount,p.id,u.img as userImage ,uid as postUserId, username,cat, title, p.img as img, description, date from posts p join users u on p.uid = u.id where p.id = ?`;

      const getPostQuery = `
            
       start transaction;




       select p.commentsCount as commentsCount,p.likesCount as likesCount,
       p.id as postId,u.img as userImage ,uid as postUserId, username,cat, title,
       p.img as img, description, date
       from posts p join users u on p.uid = u.id  where p.id = ?;




       select c.id as commentId,c.commentedByUser as commentedByUser, c.createdAt as createdAt, c.comment as comment, u.img as img , u.username as username
       from posts p join comments c on p.id = c.postId
       join users u on u.id = c.commentedByUser
       where p.id = ?;




       commit;
    
     `;
      db.query(getPostQuery, [req.params.id, req.params.id], (err, data) => {
        if (err) return console.log(err);
        // console.log(data);
        // console.log("data from getPost");
        // console.log("data from getPost");
        return res.status(200).json({ data, ifPostLiked });
      });
    });
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
  if (!token)
    return res
      .status(400)
      .json({ message: "Even hearts need ID these days. Please log in 😅" });

  const { postId, postedByUser } = req.params;

  console.log(postId);
  console.log("postId");
  console.log(postedByUser);
  console.log("postedByUser");

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err)
      res.status(400).json({
        message:
          "Even hearts need ID these days. Please log in 😅 while verifying",
      });

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
        if (err) {
          if (err.errno === 1062) {
            // logic for unliking a liked post if a user clicks the button two times

            const unlikePostQuery = `         
            start transaction ;




            delete from likes where postId = ? and likedByUser = ?;




            update posts set likesCount = (select count(*) as count from likes where postId = ?) where id = ?;




            commit;
          `;

            db.query(
              unlikePostQuery,
              [postId, likedByUser, postId, postId],
              (error, data) => {
                if (error) {
                  console.log(error);
                  return res.status(500).json({
                    message:
                      "Internal Server Error when post button is clicked again",
                  });
                }

                return res
                  .status(200)
                  .json({ message: "Post unliked successfully" });
              }
            );
            return;
          }
          console.log(err);
          return res.status(500).json({
            message:
              "Internal Server Error when the post is before post liked successfully",
          });
        }
        console.log(data);
        console.log("data");
        res.status(200).json({ message: "Post liked successfully" });
      }
    );
  });
};

const addComment = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token)
    return res.status(400).json({
      message: "🧙‍♂️ Even wizards need to log in before casting comment spells.",
    });

  const { postId, postedByUser } = req.params;

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return res.status(401).json({ message: "Token is not valid" });

    const commentedByUser = data.user.id;

    const comment = req.body.comment;

    const addCommentQuery = `
          
       start transaction;


       insert into comments (postId,postedByUser,commentedByUser,comment) values (?);


       update posts set commentsCount = (select count(*) from comments where postId = ?) where id = ?;


       commit;
   `;
    db.query(
      addCommentQuery,
      [[postId, postedByUser, commentedByUser, comment], postId, postId],
      (err, data) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({ message: "Comment added successfully" });
      }
    );
  });
};

const deleteComment = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token)
    return res.status(400).json({
      message:
        "🕵️‍♂️ Detective mode locked. Login required to delete clues (comments).",
    });

  const { commentId, postId } = req.params;

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return res.status(400).json({ message: "Token not valid" });

    const commentedByUser = data.user.id;

    const checkIfCommentExistsQuery = `
   select * from comments where id = ? and commentedByUser = ?;
   `;

    db.query(
      checkIfCommentExistsQuery,
      [commentId, commentedByUser],
      (err, data) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Internal Server Error of user matching" });
        }
        if (data.length === 0) {
          return res
            .status(400)
            .json({ message: "No user comment found for this post" });
        }

        const deleteCommentQuery = `
            
       start transaction;


       delete from comments where id = ? and commentedByUser = ?;


       commit;
     `;

        db.query(
          deleteCommentQuery,
          [commentId, commentedByUser],
          (err, data) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Internal Server Error for main query" });

            const updateCommentCountAfterDeletion = `
                   update posts set commentsCount = (select count(*) from comments where postId = ?) where id = ?;

            `;

            db.query(
              updateCommentCountAfterDeletion,
              [postId, postId],
              (err, data) => {
                if (err) return console.log(err);

                res
                  .status(200)
                  .json({ message: "Comment Deleted Successfully" });
              }
            );
          }
        );
      }
    );
  });
};

export {
  addPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
  like,
  addComment,
  deleteComment,
};
