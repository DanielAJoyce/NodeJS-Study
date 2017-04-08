var express=require("express");
var router = express.Router({mergeParams:true}); // merges parameters from campgrounds
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//Checks to see if logged in once get request is made.
router.get("/new", middleware.isLoggedIn, function(req,res){
  //Find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
    }else{
      res.render("comments/new", {campground:campground});
    }
  });
  //res.render("comments/new");
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req,res){
  //lookup campground using id
  Campground.findById(req.params.id, function(err,campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }else{
        //create new comment
        //connect comment to campground
        Comment.create(req.body.comment,function(err,comment){
          if(err){
            req.flash("error", "Something went wrong!");
            console.log(err);
          }else{
            console.log(comment);
            //add username and id to comment
            //save comment
            console.log(req.user.username);
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            campground.comments.push(comment);
            campground.save();
            console.log(comment);
            req.flash("success", "successfully added comment!");
            res.redirect("/campgrounds/"+ campground._id);
          }
        })
        
    }
  })
  //redirect campground show page.
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
   // we defined this in app js and is campground id.
   Comment.findById(req.params.comment_id, function(err,foundComment){
     if(err){
       res.redirect("back");
     }else{
         res.render("comments/edit",{campground_id: req.params.id, comment:foundComment});
     }
   });
});

router.put("/:comment_id/", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    }else{
      req.flash("success", "Deleted successfully");
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});




module.exports = router;