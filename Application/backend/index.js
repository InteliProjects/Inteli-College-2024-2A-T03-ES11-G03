const express = require("express");
const app = express();
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require("cors");
const swaggerSpec = require("./config/swagger");
const swaggerUi = require("swagger-ui-express");
const uploadRoutes = require("./routes/uploadRoutes");
const { initializeBot } = require("./config/bot");
const { createViews } = require("./SQL/views");
const user = require("./routes/userRoutes");
const { auth } = require('express-openid-connect');
const port = 3000;
require("dotenv").config();

const botTokenEnv = process.env.BOT_TOKEN;
app.use(cors());
app.use(express.json());

async function startApp() {
  if (!botTokenEnv) {
    console.error("Error: BOT_TOKEN is missing");
  } else {
    console.log("BOT_TOKEN successfully loaded in environment");
  }
  // try {
  //   await createViews();
  // } catch (err) {
  //   console.log(err);
  // }

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/", uploadRoutes);
  app.use("/api/dashboard/", dashboardRoutes);
  app.use("/api/", user);

  initializeBot();

  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  });
}

startApp().catch((err) => {
  console.error("Erro ao startar", err);
});
