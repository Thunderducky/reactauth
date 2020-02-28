require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const db = require("./models");
const passport = require("./config/passport");
const isAuthenticated = require("./middleware/isAuthenticated");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactauth");


const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

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

app.use("*", function(req, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));