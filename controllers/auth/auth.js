const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET
const expiration = '10d';

module.exports = {
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  decodeJWT: function (token){
    jwt.verify(token, secret , function(err, decoded) {
        console.log(decoded) 
      });
  }
};
