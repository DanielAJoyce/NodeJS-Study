var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj ={};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
  
  if(req.isAuthenticated()){
  Campground.findById(req.params.id,function(err,foundCampground){
    if(err){
      req.flash("error", "Campground not found");
      res.redirect("back");
    }else{
      if(foundCampground.author.id.equals(req.user._id)){//compares ids
       next(); // continue to logic of where it was called.
     }else
     {
       req.flash("You don't have permission to do that.");
       res.redirect("back");
     }
  }
    });
     //does user own campground?
     
  }else
  {
   req.flash("error", "You need to be logged in");
   res.redirect("back");
  }
}


middlewareObj.checkCommentOwnership = function(req,res,next){
  if(req.isAuthenticated()){
  Comment.findById(req.params.comment_id,function(err,foundComment){
    if(err){
      res.redirect("back");
    }else{
      if(foundComment.author.id.equals(req.user._id)){//compares ids
       next(); // continue to logic of where it was called.
     }else
     {
       req.flash("error", "You need to be logged in");
       res.redirect("back");
     }
  }
    });
     //does user own campground?
     
  }else
  {
    req.flash("error", "You need to be logged in to do that.");
    console.log("Please log in!");
   res.redirect("back");
  }
}


middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next(); // goes to the callback function that's next.
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
};


module.exports = middlewareObj;