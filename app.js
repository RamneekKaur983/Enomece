const express= require("express")
const bodyParser= require("body-parser")
const mongoose=require("mongoose")

//mongoose.connect('mongodb+srv://admin_Ramneek:Ramneek123@cluster0.cyzml.mongodb.net/Enomece', {useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/Enomece", {useNewUrlParser: true});
const app= express()
const userRoutes = require('./routes/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRoutes);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  






  
  module.exports = app;