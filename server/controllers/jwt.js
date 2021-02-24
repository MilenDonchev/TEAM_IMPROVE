const jwt = require('jsonwebtoken');
const config = require('config');

const generateAuthToken = user => {
  return jwt.sign({
    name: user.name,
    email: user.email,
    type: user.type,
    avatar: user.avatar,
    _id: user._id,
  }, config.get('jwt_privateKey'));
};

module.exports.generateAuthToken = generateAuthToken;