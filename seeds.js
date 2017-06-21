var mongoose = require("mongoose"),
    Article = require("./models/article"),
    User = require("./models/user");
    
    var data1 = [
            {
                headline: "Seed",
                link: "https://web.facebook.com",
                author: "Jan",
                username: "jan",
                points: 0
            }
        ]
    
function seedDB(){    
    Article.remove({}, function(err){
        if(err){
            console.log(err);
        }else {
            console.log("removed articles");
            data1.forEach(function(seed){
                Article.create(seed, function(err, article){
                    if(err){
                        console.log(err);
                    }else {
                        console.log("added article");
                    }
                });
            });
        }
    });
}
    User.remove({}, function(err){
        if(err){
            console.log(err);
        }
    });

module.exports = seedDB;