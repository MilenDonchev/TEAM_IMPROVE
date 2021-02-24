const express = require('express');
const cors = require('cors');
const error = require('../middleware/Error');
const userRouter = require('../routes/User');
const authRouter = require('../routes/Auth');

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use(error); // Should be at the bottom !DO NOT MOVE THIS LINE!
};