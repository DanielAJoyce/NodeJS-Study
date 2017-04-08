var express=require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var bodyParser  = require("body-parser");
var middleware = require("../middleware");




router.get("/", function(req,res){
    // res.render("campgrounds", {campgrounds:campgrounds});
    console.log(req.user);
    //get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
      if(err){
        console.log(err);
      }
      else{
        // renders page, binds "campgrounds" with allCampgrounds data.
        res.render("campgrounds/index", {campgrounds:allCampgrounds});
      }
    });
});

router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");    
});

router.post("/", middleware.isLoggedIn, function(req,res)
{
   //get data from form
   //add to campgrounds array
   //re-direct to campgrounds
   console.log(req.user);
   
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var price = req.body.price;
   var author = {
     id:req.user._id,
     username:req.user.username
   };
   var newCampground = {name: name,price:price, image: image, description:desc, author:author};
  //Create a new Campground and save to database
  
  Campground.create(newCampground,function(err,newlyCreated){
    if(err){
      console.log("couldn't save to db");
    }else{
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    
    }
  });
   
});

//SHOW - Shows more info about one campground
router.get("/:id",function(req,res){
  //find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
      console.log(foundCampground);
      //render show template with that campground
      res.render("campgrounds/show",{campground: foundCampground});
    }
  });
  
  req.params.id;
});

//UPDATE CAMPGROUND ROUTE


//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
  //is user logged in
  Campground.findById(req.params.id,function(err,foundCampground){
  res.render("campgrounds/edit",{campground:foundCampground});
});
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err,updatedCamp){
    
     if(err){
    res.redirect("/campgrounds");
  }else{
    res.redirect("/campgrounds/"+req.params.id);
  }
  
  });
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds");
    }
  })
});

module.exports = router;