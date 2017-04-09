var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {name: "Cloud's Rest", 
  image:"https://s-media-cache-ak0.pinimg.com/736x/1b/6e/00/1b6e00910f5ff95913ee9903c4d4ed87.jpg",
    description:"Tootsie roll lemon drops chupa chups sweet. Tart sweet jelly beans cookie. Cheesecake croissant jelly bear claw jelly. Biscuit marshmallow jelly beans gingerbread powder liquorice tart muffin fruitcake. Sugar plum jelly dragée carrot cake donut cake candy canes chocolate. Chocolate cake apple pie cheesecake marzipan. Biscuit gingerbread toffee. Gummi bears apple pie caramels sesame snaps caramels sweet roll. Gingerbread chocolate cake caramels chocolate cake macaroon pie halvah dragée."
  },
  {name: "Zack's Place", 
  image:"http://orig09.deviantart.net/80a5/f/2015/218/d/f/young_zack_by_dimension_dino-d94guel.png",
    description:"Tootsie roll lemon drops chupa chups sweet. Tart sweet jelly beans cookie. Cheesecake croissant jelly bear claw jelly. Biscuit marshmallow jelly beans gingerbread powder liquorice tart muffin fruitcake. Sugar plum jelly dragée carrot cake donut cake candy canes chocolate. Chocolate cake apple pie cheesecake marzipan. Biscuit gingerbread toffee. Gummi bears apple pie caramels sesame snaps caramels sweet roll. Gingerbread chocolate cake caramels chocolate cake macaroon pie halvah dragée."
  },
    {name: "Tifa's Bar", 
  image:"http://img1.wikia.nocookie.net/__cb20110505064001/finalfantasy/images/1/17/Tifa_-_012_CG.png",
    description:"Tootsie roll lemon drops chupa chups sweet. Tart sweet jelly beans cookie. Cheesecake croissant jelly bear claw jelly. Biscuit marshmallow jelly beans gingerbread powder liquorice tart muffin fruitcake. Sugar plum jelly dragée carrot cake donut cake candy canes chocolate. Chocolate cake apple pie cheesecake marzipan. Biscuit gingerbread toffee. Gummi bears apple pie caramels sesame snaps caramels sweet roll. Gingerbread chocolate cake caramels chocolate cake macaroon pie halvah dragée."
    },
    {name: "Aerith's Church", 
  image:"http://vignette2.wikia.nocookie.net/finalfantasy2/images/2/23/AerisFF7AC.jpg/revision/latest?cb=20090924125410&path-prefix=de",
    description:"Tootsie roll lemon drops chupa chups sweet. Tart sweet jelly beans cookie. Cheesecake croissant jelly bear claw jelly. Biscuit marshmallow jelly beans gingerbread powder liquorice tart muffin fruitcake. Sugar plum jelly dragée carrot cake donut cake candy canes chocolate. Chocolate cake apple pie cheesecake marzipan. Biscuit gingerbread toffee. Gummi bears apple pie caramels sesame snaps caramels sweet roll. Gingerbread chocolate cake caramels chocolate cake macaroon pie halvah dragée."}
  ];
  
function seedDB(){

  Campground.remove({},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Removed Campgrounds");  
      
      //Add campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log(err)
          }else
          {
            console.log("added campground");
            
            //Create Comment
            Comment.create({
              text:"This place is cool",
              author:"Homer"
            }, function(err,comment){
              if(err){
                console.log(err);
              }else
              {
              campground.comments.push(comment);
              campground.save()
              console.log("Pushed comment");
              }
            });
          }
        });
      });
    }
    
  });
}

module.exports = seedDB;