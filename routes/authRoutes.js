const router = require("express").Router();
const passport = require("../config/passport");
const db = require("../models");
router.post("/signup", function(req, res){
    db.User.create(req.body).then(dbUser => {
        res.json(dbUser.email);
    }).catch(err => {
        console.log(err);
    })
})

router.post("/signin", passport.authenticate("local"), (req, res) => {
    res.json(req.user.email);
})

router.get("/signout", (req, res) => {
    req.logout();
    res.sendStatus(200);
});
module.exports = router;