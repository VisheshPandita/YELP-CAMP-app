var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "assam",
//         image: "https://images.unsplash.com/photo-1517968382857-9c08a40a988b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=55029c0f5935ddbdcb6d4bfe1f12921e&auto=format&fit=crop&w=500&q=60",
//         description: "This is a beautyfull image."     
//     }, 
//     function(err, campground){
//         if(err){
//             console.log("err");
//         } else{
//             console.log("Newly created campground: ");
//             console.log(campground);
//         }
//     }

// );


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // Get all the capmgrounds form DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });

});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};

    //Create new Campground and save it to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect('/campgrounds');
        }
    });

});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

//SHOW- show us more info about one campground
app.get("/campgrounds/:id", function(req, res){
    
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
    console.log("YelpCamp server is onn!");
});