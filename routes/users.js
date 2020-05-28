const rounter = require("express").Router();
let User = require("../models/user.model");

rounter.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

rounter.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
     
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
 
module.exports = rounter;