// create web server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const comments = require("./commentsData");

app.use(cors());
app.use(bodyParser.json());

const port = 4001;

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
