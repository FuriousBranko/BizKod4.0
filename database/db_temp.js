const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var tempSchema = new Schema({
    createdAt:{
        type: Date,
        expires: 10
    },
    apoitement:[{
    year: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true
    }}]
});
var tempmModel = mongoose.model("temp",tempSchema);
var datetime = new Date();
/*var tempor = new tempmModel({createdAt: datetime,apoitement:[{year: "2020",month: "09",day:"21",slot:"10"},{year: "2033",month: "12",day:"07",slot:"22"}]});
tempor.save(function(err,res){
    console.log(res);
});*/

function checkToken(id,callback){
    tempmModel.findOne({_id: id},function(err,res){
        callback(res);
    });
   
};
module.exports = {
    checkToken: checkToken
};
