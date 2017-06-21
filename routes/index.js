var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");


//root route
router.get("/", function(req, res){
    res.render("landing")
});


// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});


//handle sign up logic
router.post("/register", function(req, res){
        if(req.body.username && req.body.password !== null){
        var newUser = new User({username: req.body.username});
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                req.flash("error", err);
                return res.render("register");
            }
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to Feeddit " + user.username);
                res.redirect("/article"); 
            });
        });
    }else{
        req.flash("error", "Popunite sva polja");
        res.redirect("/register");
    }
});


// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});


// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/article",
        failureRedirect: "/login"
    }), function(req, res){
});


// logic route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Loogged you out!");
   res.redirect("/");
});


module.exports= router;