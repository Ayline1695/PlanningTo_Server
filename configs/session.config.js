require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { SESSION_SECRET, MONGODB_URI } = process.env;

module.exports = (app) => {
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 6000000 },
      store: MongoStore.create({
        mongoUrl: MONGODB_URI,
        ttl: 60 * 60 * 24,
      }),
    })
  );
};
