require("dotenv").config();
const express = require("express");
const app = express();
//middleware
require("./configs/middleware.config")(app);
//db
require("./configs/db.config")();
//Session
require("./configs/session.config")(app);

const projectRoutes = require("./routes/project.routes");
const authRoutes = require("./routes/auth.routes");
const listRoutes = require("./routes/list.routes");

app.use("/", authRoutes);
app.use("/projects", projectRoutes);
app.use("/lists", listRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running");
});
