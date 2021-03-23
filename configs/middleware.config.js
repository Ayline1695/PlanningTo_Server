const bodyParser = require("body-parser");
const cors = require("cors"); //  habilita las llamadas desde otro origen
const cookieParser = require("cookie-parser");
const origin = process.env.PUBLIC_DOMAIN;
const corsConfig = { origin: origin, credentials: true };

console.log("PROCESS", process.env.PUBLIC_DOMAIN);
module.exports = (app) => {
  app.use(cors(corsConfig));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
};
