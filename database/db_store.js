const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var itemSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    desc:{
        type: String,
        require: false
    },
    image:{
        type: String,
        require: false
    }
});
var itemModel = mongoose.Model("Item",itemSchema);
