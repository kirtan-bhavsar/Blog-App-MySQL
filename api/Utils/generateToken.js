import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const generateToken = (data, req, res) => {
  const { id, password, username } = data;

  const payload = {
    user: {
      id,
    },
  };

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  // const { password, ...other } = data;
  const responseBody = { id, username, token };

  return res.cookie("acessToken", token, cookieOptions).status(200).json({
    message: "👏You logged in! Now go pretend to be productive",
    data: responseBody,
  });
};

export default generateToken;
