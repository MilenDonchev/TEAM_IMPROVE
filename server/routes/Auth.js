const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../models/User');

const { generateAuthToken } = require('../controllers/jwt');

router.post('/', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Грешен имейл или парола.");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Грешен имейл или парола.");

  const token = generateAuthToken(user);

  res.send(token);
});

module.exports = router;