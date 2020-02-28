require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const db = require("./models");
const passport = require("./config/passport");
const isAuthenticated = require("./middleware/isAuthenticated");
mongoose.connect("mongodb://localhost/reactauth");


const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/hello", function(req, res){
    res.send("hello world! Welcome!");
})

app.use("/api/auth/", authRoutes);

// Create a route, that will only work for logged in users
app.get('/api/user/me', isAuthenticated, (req, res) => {
    res.json({
        email : req.user.email
    })
});

app.get('/api/secret/number', isAuthenticated, (req, res) => {
    res.json(7);
});



app.listen(3001);