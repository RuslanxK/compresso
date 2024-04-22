const express = require("express");
const cors = require("cors");
const postRouter = require("./routers/postRouter")
const PORT = 8080;

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());

require("./configs/database");



app.use("/api", postRouter)

app.listen(process.env.PORT || PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
