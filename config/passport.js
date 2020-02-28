const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(new LocalStrategy({ usernameField: "email" }, function(email, password, done){
    User.findOne({ email: email }).then(dbUser => {
        if(!dbUser){
            return done(null, false, {message: "Incorrect username or password"})
        } else {
            console.log(dbUser);
            dbUser.checkPassword(password).then(isMatch => {
                if(isMatch){
                    return done(null, dbUser)
                } else {
                    return done(null, false, {message: "Incorrect username or password"})
                }
            })
        }
    }).catch(err => console.log(err))
}))

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

module.exports = passport;