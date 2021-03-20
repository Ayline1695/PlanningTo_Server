require("dotenv").config();

const express = require("express");
const app = express();

//db
require("./configs/db.config")();
//middleware
require("./configs/middleware.config")(app);
//Session
require("./configs/session.config")(app);

const projectRoutes = require("./routes/project.routes");
const authRoutes = require("./routes/auth.routes");
const postitRoutes = require("./routes/postit.routes");
const taskRoutes = require("./routes/task.routes");

app.use("/", authRoutes);
app.use("/projects", projectRoutes);
app.use("/lists", postitRoutes);
app.use("/task", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running");
});
