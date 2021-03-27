const User = require("../models/User.model");
const bycript = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const hasMissingCredentials = !email || !password;
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    const saltRounds = 10;
    //validaciones
    const salt = await bycript.genSalt(saltRounds);
    const hashPassword = await bycript.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    //guardamos el id del usuario en la session, lo usamos en las rutas, cuando se quiera recuperar la info del usuario
    req.session.userId = newUser._id;
    return res.status(200).json(newUser);
  } catch (e) {
    console.log("ERROR -> ", e);
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hasMissingCredentials = !email || !password;
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const hasCorrectPasssword = await bycript.compare(password, user.password);
    if (!hasCorrectPasssword) {
      return res.status(401).json({ message: "unauthorize" });
    }

    req.session.userId = user._id;
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.logout = async (req, res) => {
  await req.session.destroy();
  res.status(200).json({ message: "Log out sucess" });
};

exports.getUser = async (req, res) => {
  const { userId } = req.session;
  const user = await User.findById(userId).populate("projects");
  res.status(200).json(user);
};

//Upload img
exports.uploadImage = async (req, res) => {
  console.log("req.file", req.file);
  if (!req.file) {
    next(new Error("No file uploaded"));
    return;
  }
  res.json(req.file.path);
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userinfo = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      omitUndefined: true,
    });
    res.status(200).json(userinfo);
  } catch (e) {
    res.status(400);
  }
};
