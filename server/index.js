const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const postRouter = require("./routers/postRouter")

const PORT = 8080;

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

var jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 20,
  type: "application/json",
});
var urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: "application/x-www-form-urlencoded",
});

app.use(jsonParser);
app.use(urlencodedParser);

app.use(express.json());

require("./configs/database");

app.use("/api", postRouter)


app.listen(process.env.PORT || PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
