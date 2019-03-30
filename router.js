const express = require("express");
const router = express.Router();
const path = require("path");
const usersdb = require("./database/db_users.js" );
const validator = require("joi");
const bcrypt = require("bcrypt");
const requestsdb = require("./database/db_struct.js");
const tempdb = require("./database/db_temp.js");

//WebPage request handler

/////////////Register///////////////
router.get("/register",function(req,res){
    console.log("Session errors:");
    console.log(req.session.errors);
    res.render("register",{success: req.session.success , error: req.session.errors});
    req.session.errors = null;
});
router.post("/register",function(req,res){
    console.log(req.body);
    var secureprint = validator.object().keys({
        username: validator.string().trim().min(5).max(20).required(),
        email: validator.string().trim().email().required(),
        password: validator.string().min(8).max(20).required()
    });
    validator.validate(req.body,secureprint,function(err,result) {
        if(err){
            console.log("Information not valid...");
            req.session.errors = err.message;;
            res.send({url: "/register"});
        }
        else{
            console.log("Information valid putting into database...");
            bcrypt.genSalt(10, function(err, salt) {
                if(!err)
                {
                    bcrypt.hash(result.password, salt, function(err, hash) {
                        if(!err)
                        {
                            usersdb.CreateAndSend(result.username,result.email,hash,salt); //push to database
                        }
                        else
                        {
                            console.log(err.message);
                        }
                    });
                }
                else
                {
                    console.log(err.message);
                }
            });
        res.send({url: "/login"});
        }
    });
});
/////////////Main//////////////////
router.get("/login",function(req,res){
    console.log(req.session.errors);
    res.render("login",{success: req.session.success , error: req.session.errors});
    req.session.errors = null;
    
});
router.post("/login",function(req,res){//login post
    console.log(req.body);
    var secureprint = validator.object().keys({ //user input parsing/validating 
        username: validator.string().min(5).max(20).required(),
        password: validator.string().min(8).max(20).required()
    });
    validator.validate(req.body,secureprint,function(err,result) {
        if(err){//invalid input
            console.log("Information not valid...");
            req.session.errors = err.message;
            req.session.success = false;
            res.send({url: "/login"});
        }
        else{
            var dbpassword = "";
            usersdb.getElementByName(req.body.username,function(error,data){
                console.log("OBJECT FOUND:"+data);
                dbpassword = data;
                if(dbpassword != null)
                {
                     bcrypt.compare(req.body.password,dbpassword,function(error,result){
                        if(!error)
                        {
                            if(result)
                            {
                                req.session.success = true;
                                if(req.body.username == "admin")
                                {
                                    req.session.admin = true;
                                }
                                else
                                {
                                    req.session.admin = false;
                                }
                                console.log("Information valid loging in...");
                                res.send({url: "/login"});
                            }
                            else
                            {
                                console.log("information not valid");
                                res.send({url: "/login" , error: "login failed"})
                            }
                        }
                    });
                }
            });
        }
    });
});
////////////////logout/////////////
router.get("/logout",function(req,res){
    req.session.success = false;
    res.clearCookie(req.sessionID);
    req.session.destroy(function(){
        console.log("Session destroyed...");
    });
    res.redirect("login");
});
/////////////////admin//////////////
router.get("/admin",function(req,res){
    if(req.session.success && req.session.admin)
    {
        res.render("admin");
    }
    else
    {
        res.redirect("login");
    }
    
});
router.post("/homer",function(req,res){
    //if(req.session.success == true)
    //{
        requestsdb.find({"year": req.body.year , "month": req.body.month},function(err,result){
            res.send(result);
        });
    //}
});
/////////////temp///////////////////
router.get("/temp",function(req,res){
    console.log(req.query.id);
    if(req.query.id)
    {
        tempdb.checkToken(req.query.id,function(result){
            if(result)
            {
                console.log("woop");
            }
            else
            {
                console.log("denied");
            }
        });
    }
    res.render("temp");
});
router.post("/temp",function(req,res){
    //res.post("temp");
});
////////////upload//////////////////
router.get("/upload",function(req,res){
    res.render("upload");
});
router.post("/upload",function(req,res){
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else
    {
        console.log(req.files);
        res.send("kk");
    }
});
module.exports = router;
