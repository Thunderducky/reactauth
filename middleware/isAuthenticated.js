module.exports = function isAuthenticated(req, res, next){
    if(!req.user){
        return res.status(401).end();
    }
    return next();
}