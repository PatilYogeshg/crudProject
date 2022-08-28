const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const config = require('dotenv').config() 
module.exports.Auth = async (userid)=>{
    console.log("//////////////---",process.env.SECRET_KEY)
    return new Promise(async (resolve,reject)=>{

// let SECRET_KEY = "ChaitanyaPatilMaheshPatilYogeshPatilArmanKhanMansiShubhamYadav"  


const token = await jwt.sign({_id : userid },
  process.env.SECRET_KEY,
  {
    expiresIn: "1h",
  })
console.log("token is -----------",token)
resolve(token)
    })
}




