const User = require("../models/User.model");
const bycript = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
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
    const newUser = await User.create({ email, password: hashPassword });
    //guardamos el id del usuario en la session, lo usamos en las rutas, cuando se quiera recuperar la info del usuario
    req.session.userId = newUser._id;
    return res.status(200).json({ user: email });
  } catch (e) {
    console.log("ERROR: ", e);
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

    req.session.userId = user.userId;
    return res.status(200).json({ user: user.email });
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
  const { email, _id } = await User.findOne(userId).populate([
    {
      path: "projects",
    },
    {
      path: "tasks",
    },
    {
      path: "lists",
    },
  ]);
  res.status(200).json({ id: _id, email });
};
