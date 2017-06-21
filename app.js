var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Vote = require("./models/vote"),
    Article = require("./models/article"),
    User = require("./models/user"),
    methodOverride = require("method-override"),
    paginate = require('express-paginate');
    //seedDB = require("./seeds"); //---->ako ces radit seed


//requring routes    
var indexRoutes = require("./routes/index"),
    sectionRoutes = require("./routes/section"),
    articleRoutes = require("./routes/article");
    
mongoose.connect('mongodb://jananicic:password@ds133582.mlab.com:33582/feeddit'); 
process.env.databaseURL
//mongoose.connect('mongodb://localhost/feeddit');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(paginate.middleware(4, 10));
//seed the database (brisanje svega, pa dodavanje novih articla)
//seedDB();


//passport configuration
app.use(require("express-session")({
    secret: "broj 7 je svetinja",
    resave: false,
    saveUninitialized: false
}));


//authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//flash obavijesti i errori i CURRENTUSER
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.currentArticle = req.article;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//use routes
app.use(indexRoutes);
app.use(articleRoutes);
app.use(sectionRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!(feeddit)");
});