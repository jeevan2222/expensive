const express = require("express");
const app = express();
const port = 4321;

const cors = require("cors");

// app.use("cors");

app.get("/", (req, res) => {
  res.send("Hello im from SPACE");
});

app.listen(port, () => {
  console.log("server running", port);
});
