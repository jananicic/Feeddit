var express = require("express"),
    router = express.Router(),
    Article = require("../models/article"),
    Vote = require("../models/vote"),
    middleware = require("../middleware"),
    User = require("../models/user");

//index route
router.get("/article", middleware.isLoggedIn, function(req, res){
    Article.find({}, function(err, allArticles){
        if(err){
            console.log(err);
        }else{
            res.render("article/index", {articles: allArticles});
        }
    });
});


//upvote function
router.post("/article/upvote", middleware.isLoggedIn, function(req, res){
    var user = req.body.username;
    var article = req.body.article;
    var info = {
                    article_id: article, 
                    username: user,
                    value: 1
    };
    console.log("article_id: "+article);
    Vote.find({article_id: article}, function(err, testVote){
        var testVote2 = testVote.toString();
        if(err){
            console.log(err);
            res.redirect("/article");
        }
        if (testVote2){
            if( 1 > testVote[0].value){
                console.log("ima glas i dodaj 1 points i dodaj 1 votes");
                    Article.find({_id: article}, function(err, allArticles){
                        if(err){
                            console.log(err);
                        }else{
                            Article.update({_id: article},{ $inc: { points: +1 } },
                                function(err,data){
                                    if (err){
                                        console.log(err);
                                    }else{
                                        Vote.update({article_id: article,username: user},{ $inc: { value: +1 } },
                                            function(err,data){
                                                if (err){
                                                    console.log(err);
                                                }else{
                                                    req.flash("success", "Dodan je glas +1");
                                                    res.redirect("/article");
                                                };
                                            }
                                        );
                                    };
                                }
                            );
                        }
                    });
            }else{
                console.log("ima podatke i vote je maximalan +")
                req.flash("error", "Već ste glasali za +1!");
                res.redirect("/article");
            }
        }else{
            console.log("nema glas i glasat ce za jedan i dodat cemo ga u db");
            Vote.create(info, function(err){
                if(err){
                    console.log(err);
                }else{
                    Article.find({_id: article}, function(err, allArticles){
                        if(err){
                            console.log(err);
                        }else{
                            Article.update({_id: article},{ $inc: { points: 1 } },
                                function(err,data){
                                    if (err){
                                        console.log(err);
                                    }else{
                                        req.flash("success", "Dodan je glas +1");
                                        res.redirect("/article");
                                    };
                                }
                            );
                        }
                    });
                }
            });
        } 
    });

});

//downvote function
router.post("/article/downvote", middleware.isLoggedIn, function(req, res){
    var user = req.body.username;
    var article = req.body.article;
    var info = {
                    article_id: article, 
                    username: user,
                    value: -1
    };
    Vote.find({article_id: article,username: user}, function(err, testVote){
        var testVote2 = testVote.toString();
        if(err){
            console.log(err);
            res.redirect("/article");
        }
        if (testVote2){
            if( -1 < testVote[0].value){
                console.log("ima glas i oduzmi 1 points i oduzmi 1 votes");
                    Article.find({_id: article}, function(err, allArticles){
                        if(err){
                            console.log(err);
                        }else{
                            Article.update({_id: article},{ $inc: { points: -1 } },
                                function(err,data){
                                    if (err){
                                        console.log(err);
                                    }else{
                                        Vote.update({article_id: article,username: user},{ $inc: { value: -1 } },
                                            function(err,data){
                                                if (err){
                                                    console.log(err);
                                                }else{
                                                    req.flash("success", "Dodan je glas -1");
                                                    res.redirect("/article");
                                                };
                                            }
                                        );
                                    };
                                }
                            );
                        }
                    });
            }else{
                console.log("ima podatke i vote je mminimalan -")
                req.flash("error", "Već ste glasali za -1!");
                res.redirect("/article");
            }
        }else{
            console.log("nema glas i glasat ce za -jedan i dodat cemo ga u db");
            Vote.create(info, function(err){
                if(err){
                    console.log(err);
                }else{
                    Article.find({_id: article}, function(err, allArticles){
                        if(err){
                            console.log(err);
                        }else{
                            Article.update({_id: article},{ $inc: { points: -1 } },
                                function(err,data){
                                    if (err){
                                        console.log(err);
                                    }else{
                                        req.flash("success", "Dodan je glas -1");
                                        res.redirect("/article");
                                    };
                                }
                            );
                        }
                    });
                }
            });
        } 
    });

});

//create new article route
router.post("/article", middleware.isLoggedIn, function(req, res){
    
    var headline = req.body.headline;
    var link = req.body.link;
    var author = req.body.author;
    var user = req.user.username;
    var points = 0;
    if(headline && link && author !== null){
        var newArticle = {
                            headline: headline, 
                            link: link, 
                            author: author, 
                            username:user, 
                            points: points
                        };
        Article.create(newArticle, function(err, newlyCreated){
            if(err){
                console.log(err);
            }else{
                User.update({username:req.body.username});
                res.redirect("/article");
            }
        });
    }else{
        req.flash("error", "Obavezno sve popuniti!");
        res.redirect("/article/new");
    }
});

//new article route
router.get("/article/new", middleware.isLoggedIn, function(req, res){
    res.render("article/new", {currentUser: req.user});
});



module.exports= router;