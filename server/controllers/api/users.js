const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT = 6;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  create,
  login,
  verifyToken,
};

async function create(req, res) {
  if (req.body.password !== req.body.confirm)
    return res.status(400).json({ msg: 'Passwords Do Not Match' });
  if ((await User.find({ email: req.body.email })).email)
    return res.status(400).json({ msg: 'Email Already Exists' });

  const hashedPassword = await bcrypt.hash(req.body.password, SALT);
  try {
    const user = await User.create({ ...req.body, password: hashedPassword });
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '12h' });
    res.status(201).json(token);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Something Went Wrong!' });
  }
}

async function login(req, res) {
  try {
    const user = await User.find({ email: req.body.email });
    if (!user)
      return res.status(400).json({ msg: 'Invalid Email or Password' });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.status(400).json({ msg: 'Invalid Email or Password' });
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '12h' });
    res.status(200).json(token);
  } catch (e) {
    res.status(500).json({ msg: 'Something Went Horribly Wrong!' });
  }
}

async function verifyToken(req, res) {
  let token = req.get('Authorization') || req.query.token || req.body.token;
  token = token.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ verified: false });
    }
    res.status(200).json(decoded);
  });
}
