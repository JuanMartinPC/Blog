require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const tokenSign = (user, time) => {
  const token = jwt.sign(user, SECRET, { expiresIn: time });
  return token;
};

const tokenVerify = async (token) => {
  try {
    const cleanToken = token.split(" ").pop();
    const tokenVerification = jwt.verify(cleanToken, SECRET);
    console.log(tokenVerification);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { tokenSign, tokenVerify }