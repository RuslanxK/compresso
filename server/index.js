const express = require("express");
const cors = require("cors");
const postRouter = require("./routers/postRouter")
const fileUpload = require("express-fileupload");
const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

require("./configs/database");

app.use("/api", postRouter)


app.listen(process.env.PORT || PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
