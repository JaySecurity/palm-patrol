const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT = 6;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  create,
  login,
};

async function create(req, res) {
  if (req.body.password !== req.body.confirm)
    res.status(400).json({ msg: 'Passwords Do Not Match' });
  else if (await User.find({ email: req.body.email }))
    res.status(400).json({ msg: 'Email Already Exists' });
  else {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT);
    try {
      const user = await User.create({ ...req.body, password: hashedPassword });
      const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '24h' });
      res.status(201).json(token);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: 'Something Went Wrong!' });
    }
  }
}

async function login(req, res) {}
