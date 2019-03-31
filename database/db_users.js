const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: { type: String, default: 'Doug' },
    email: { type: String, default: 'anon@mail.com' },
    password: {type: String, require: true},
    salt: {type: String, require: true}
});
var userModel = mongoose.model("Users", userSchema);

async function CreateAndSend(uname,umail,upassword,usalt){
    var user = new userModel({
        name: uname,
        email: umail,
        password: upassword,
        salt: usalt
    });
    user.save().then(function(){
        console.log("model exported");
    });
}
function getElementByName(name , callback){
        userModel.findOne({name: name},function(err,result){
        if(result != null)
        {
            console.log("Found a user:" + result);
            console.log(result.password);
            callback("",result.password);
        }
        else
        {
            if(err != null)
            {
                console.log(err.message);
                callback("Something wrong","dummypassaosdhosadasoihdoaishd");
            }
            else
            {
                console.log("user not found");
                callback("User not found","dummypassaosdhosadasoihdoaishd");
            }
        }
    });
}
    module.exports = {
        CreateAndSend : CreateAndSend,
        getElementByName : getElementByName
    };


