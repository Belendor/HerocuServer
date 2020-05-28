const express = require("express")
const app = express()

let User = require("./models/user.model");

const exerciseRoute = require("./routes/exercises");

const cors = require("cors");

const mongoose = require("mongoose");


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);
  
const connection = mongoose.connection;

connection.once("open", () => {
console.log("ManoDB connected succesfuly");
});

const PORT = process.env.PORT || 5000;


app.get("/", (req,res)=>{
    res.send("app is runing")})

app.use("/exercises", exerciseRoute);


app.get("/users", (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
app.post("/users/add", (req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });
    
    newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.listen(PORT, () => {
    console.log("Server is running on: " + PORT);
    });