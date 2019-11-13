const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/v1/userdata", function(req, res) {
  let rawdata = fs.readFileSync("./server/data.json");
  let chartPoints = JSON.parse(rawdata);

  res.send(chartPoints);
});

app.listen(5000, () => console.log("Server started on port 5000"));
