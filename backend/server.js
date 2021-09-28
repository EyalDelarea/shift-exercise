require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/index");
const shiftsRouter = require("./routes/shifts");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.log("There was an error in the DB connction..." + err);
});
db.once("open", () => {
  console.log("Conncted to DB ");
});

app.use("/", indexRouter);
app.use("/shifts", shiftsRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
