const jwt = require("jsonwebtoken");
const Auth = require("../util/jwtToken")

const config = require('dotenv').config() 

// const config = process.env;

const verifyToken =  (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const userVerification =  jwt.verify(token,process.env.SECRET_KEY);
   
    //  console.log("token verification :=>",userVerification)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
// verifyToken()
module.exports = verifyToken;
