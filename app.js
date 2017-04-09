var express           = require("express"),
    app = express(),
    mongoose          = require("mongoose"),
    bodyParser        = require("body-parser"),
    Comment           = require("./models/comment"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local"),
    Campground        = require("./models/campground"),
    User              = require("./models/user"),
    methodOverride    = require("method-override"),
    flash             = require("connect-flash"),
    seedDB            = require("./seeds"),
    
// ==========requiring routes===================
    commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");
    
    
mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://aperson:lolol@ds131510.mlab.com:31510/yelpcamp");
//mongoose.connect("mongodb://localhost/yelp_camp");


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public")); // origin of the project (safe way to do it)
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // Seed the database.

//=====================================
//PASSPORT CONFIG

app.use(require("express-session")({
  secret:"Campgrounds are fun",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================================

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success=req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
  console.log("YelpCamp Server Has Started");
})