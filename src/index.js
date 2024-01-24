const express = require("express");
const app = express();
const port = 4321;

app.get("/", (req, res) => {
  res.send("Hello im from SPACE");
});

app.get("/data", (req, res) => {
  res.send("Hello im from Mars");
});

app.listen(port, () => {
  console.log("server running", port);
});
