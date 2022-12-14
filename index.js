import express from "express";
import cors from "cors";
import divelogApiRouter from "./api-routes/divelog-api-routes.js";
import userApiRouter from "./api-routes/user-api-routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Welcome! This is for CS3219 Task B  :D"));

app.use("/api/divelog", divelogApiRouter).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

app.use("/api/user", userApiRouter).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running app on port " + port);
});

export default app;
