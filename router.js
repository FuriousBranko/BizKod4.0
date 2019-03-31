const express = require("express");
const router = express.Router();
const path = require("path");
const usersdb = require("./database/db_users.js" );
const validator = require("joi");
const bcrypt = require("bcrypt");

//WebPage request handler

///////////////////////////////////////////Register////////////////////////////////////////
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
    validator.validate(req.body,secureprint,function(err,result){
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
                        else//error while hashing
                        {
                            console.log(err.message);
                        }
                    });
                }
                else//error while generating salt
                {
                    console.log(err.message);
                }
            });
        res.send({url: "/main"});
        }
    });
});
///////////////////////////////////////////Main/////////////////////////////////////////
router.get("/main",function(req,res){
    console.log(req.session.errors);
    res.render("main",{success: req.session.success , error: req.session.errors});
    req.session.errors = null;
    
});

router.post("/main",function(req,res){//login post
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
            res.send({url: "/main"});
        }
        else{
            usersdb.getElementByName(req.body.username,function(error,dbpassword){
                console.log("OBJECT FOUND:" + dbpassword);
                if(dbpassword != null) //if a password has been found
                {
                     bcrypt.compare(req.body.password,dbpassword,function(error,result){
                        if(!error) //no error while comparing
                        {
                            if(result)
                            {
                                req.session.success = true;
                                console.log("Information valid loging in...");
                                res.send({url: "/main"});
                            }
                            else
                            {
                                console.log("information not valid");
                                res.send({url: "/main" , error: "login failed"})
                            }
                        }
                        else
                        {
                            console.log("error while comparing");
                            res.send({url: "/main" , error: "login failed"})
                        }
                    });
                }
                else //no password found
                {
                    console.log("error while comparing");
                    res.send({url: "/main" , error: "login failed"})
                }
            });
        }
    });
});
/////////////////////////////////////////logout//////////////////////////////////
router.get("/logout",function(req,res){
    req.session.success = false;
    res.clearCookie(req.sessionID);
    req.session.destroy(function(){
        console.log("Session destroyed...");
    });
    res.redirect("main");
});
module.exports = router;
