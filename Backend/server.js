import express from "express";
import cors from "cors";
import connect from "./database/conn.js";
import router from "./router/route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/login", (req, res) => {
  res.status(201).json("Home Get Request");
});

app.use("/app", router);

connect()
  .then(() => {
    try {
      app.listen(8000, () => {
        console.log("Server is live now on port 8000");
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });
