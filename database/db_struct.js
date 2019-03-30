const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/defect', {useNewUrlParser: true});
var Schema = mongoose.Schema;

var candidateSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    speciality:{
        type: String,
        required: true
    },
    profile:{
        type: String,
        required: true
    },
    cv:{
        type: String,
        required: true
    }
});

var employeeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    profile:{
        type: String,
        required: true
    }
});

var meetingSchema = new Schema({
    employee: employeeSchema,
    candidate: candidateSchema
});

var slotSchema = new Schema({
    slotNumber:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    meeting: meetingSchema,
});

var daySchema = new Schema({
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
    slots:[slotSchema],

});

var dayModel = mongoose.model("Day",daySchema);
var candidateModel = mongoose.model("Candidate",candidateSchema);
module.exports = {
    dayModel: dayModel,
    candidateModel: candidateModel
};
/*var day = new dayModel({
    year: 2020,
    month: 2,
    day: 1,
    slots:[{
        slotNumber: 1,
        time:"7:00-7:30",
        meeting:{
            employee:{
                name: "Radnik1",
                surname:"Zuccer1",
                profile:"Profilna employee"
            },
            candidate:{
                name:"Kandidat1",
                surname:"Bandit",
                age: 22,
                speciality:"IT",
                profile:"profilna slika",
                cv:"cv kandidata"
            }
        }
    }],
});*/
/*day.save(function (err) {
    console.log("Sent");
});*/


