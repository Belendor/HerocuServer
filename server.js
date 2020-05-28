const express = require("express")
const app = express()

const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Belendor:n1nt3nd0192@cluster0-5xlaf.gcp.mongodb.net/test?retryWrites=true&w=majority", {
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

app.listen(PORT, () => {
    console.log("Server is running on: " + PORT);
    });