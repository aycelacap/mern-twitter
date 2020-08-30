const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users")
const tweets = require("./routes/api/tweets");
const User = require('./models/User')
const bodyParser = require('body-parser')
const passport = require("passport");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

console.log("app01");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

console.log("app1")
app.get("/", (req, res) => {
  console.log("app2");
  const user = new User({
    handle: 'jim',
    email: 'jim@jim.jim',
    password: 'jimisgreat123'
  })
  user.save()
  app.use(passport.initialize());
});

console.log("app3");
app.use("/api/users", users)
app.use("/api/tweets", tweets)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

