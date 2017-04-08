var mongoose = require("mongoose");
// var Comment = require("./models/comment");
//        SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name:String,
  price:String,
  image:String,
  description:String,
  author:{
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }]
});

//Creates model
module.exports = mongoose.model("Campground", campgroundSchema);