const mongoose = require('mongoose')

const InspectionSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        require: true
    },
    model:{
        type: String,
        require: true
    },
    date:{
        type: String,
        require: true
    },
    time:{
        type: String,
        require: true
    },
    timeStamp:{
        type: String,
        require: true
    }
})


module.exports = mongoose.model("inspections", InspectionSchema)