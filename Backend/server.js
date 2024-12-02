import express from "express";
import cors from "cors";

const app = require(express);

app.use(cors());

app.post("/login", (req, res) => {});

app.listen(8000, () => {
  console.log("Server is live now on port 8000");
});
