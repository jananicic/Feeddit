var express = require("express"),
    router = express.Router({mergeParams:true}),
    Article = require("../models/article"),
    User = require("../models/user"),
    middleware = require("../middleware");

//index route
router.get("/:username", middleware.isLoggedIn, function(req, res){
    Article.find({username: req.params.username}, function(err, allArticles){
        if(err){
            console.log(err);
        }else{
                res.render("section/index", {articles: allArticles, currentUser: req.user});
        }
    });
});


router.delete("/:username", function(req, res){
            var checkboxes = req.body.deleteCheckbox;
            if(checkboxes){
            var ime = checkboxes.toString();
            
            var selected = ime.split(',');
            var selected2 = selected;
                for(var i=0; i< selected.length; i++){
                    Article.findByIdAndRemove(selected[i], function (err){
                    if(err) {
                       console.log(err); 
                    }
                    });
                }
                req.flash("success", "uspješno obrisano " + selected2.length + " !");
                res.redirect("/" + req.user.username);
            }else{
                req.flash("error", "Niste ništa odabrali!");
                res.redirect("/" + req.user.username);
            }
});



module.exports= router;
