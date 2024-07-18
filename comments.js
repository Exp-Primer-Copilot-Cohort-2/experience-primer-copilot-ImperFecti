// Create Web Server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install ejs
// npm install express-session
// npm install connect-flash
// npm install method-override
// npm install passport
// npm install passport-local
// npm install passport-local-mongoose

// Require Modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Comments = require("./models/comment");
var seedDB = require("./seeds");

// Require Routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

// Seed Database
seedDB();

// Set View Engine
app.set("view engine", "ejs");

// Use Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Use Public Directory
app.use(express.static(__dirname + "/public"));

// Use Method Override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Use Flash
var flash = require("connect-flash");
app.use(flash());

// Use Express Session
var expressSession = require("express-session");
app.use(
  expressSession({
    secret: "YelpCamp",
    resave: false,
    saveUninitialized: false,
  })
);

// Use Passport
var passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// Require Passport Configuration
var LocalStrategy = require("passport-local");
var User = require("./models/user");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass currentUser
