const express = require("express");
const expressSession = require("express-session");
const handlebars = require("express-handlebars");
const fileUpload = require('express-fileupload');
const mongoStore = require("connect-mongo")(expressSession);
const mongoose = require('mongoose');
const cookieParser = require("cookie");
mongoose.connect('mongodb://localhost:27017/defect', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const app = express();
//web page generator
app.engine("hbs",handlebars({extname: ".hbs",defaultLayout: "default",layoutsDir: __dirname + "\\views\\layouts"}));
app.set("views", __dirname + "\\views");
app.set("view engine" , "hbs");
//Middleware
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({extended : false}));
app.use(fileUpload());
app.use(expressSession({
    secret: "/verysecuresecret/", 
    saveUninitialized: false,//return to false 
    resave: false,//return to false
    store: new mongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 120 * 1000}//30sec cookie lifetime
}));
app.use("/", require("./router"));
app.use("/assets",express.static("assets/scripts"));
app.use("/assets",express.static("assets/css"));
app.use("/assets",express.static("assets/images"));

//start server
app.listen("8080",function(){
    console.log("listening port 8080...");
});