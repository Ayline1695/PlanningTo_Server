const User = require("../models/User.model");
const bycript = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hasMissingCredentials = !email || !password;
    if (hasMissingCredentials) {
      return res.send(400).json({ message: "missing credentials" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.send(400).json({ message: "user already exist" });
    }
    const saltRounds = 10;
    //validaciones
    const salt = await bycript.genSalt(saltRounds);
    const hashPassword = await bycript.hash(password, salt);
    const newUser = await User.create({ email, hashPassword });
    return res.send(200).json({ user: email });
  } catch (e) {
    return res.send(400).json({ message: "wrong request" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hasMissingCredentials = !email || !password;
    if (hasMissingCredentials) {
      return res.send(400).json({ message: "missing credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.send(400).json({ message: "user does not exist" });
    }
    const hasCorrectPasssword = await bycript.compare(password, user.password);
    if (hasCorrectPasssword) {
      return res.send(401).json({ message: "unauthorize" });
    }
    return res.send(200).json({ user: user.email });
  } catch (e) {
    return res.send(400).json({ message: "wrong request" });
  }
};
