const Express = require('express')
const app = Express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// connect to db
mongoose.connect(
    process.env.DB_CONNECTION, 
    { 
        useNewUrlParser: true,  
        useUnifiedTopology: true
    })
const Inspections = require("./models/inspections")

app.use(bodyParser.json())

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

async function loadInpections() {
    return await Inspections.find({})
}

app.get('/', (request, response) => {
    loadInpections().then(res => {
        response.json({
            message: 'Inspections list fetched successfully',
            data: res
        })
    }).catch(err => {
        response.json({
            message: err,
            data: []
        })
    })
})

app.post('/inspection', (request, response) => {
    const { 
        name, 
        mobile,
        brand,
        model,
        date,
        time 
    } = request.body
    const InspectionsObject = Inspections({
        name, 
        mobile,
        brand,
        model,
        date,
        time,
        timeStamp: new Date()
    })
    try {
        InspectionsObject.save()
        response.json({
            message: 'Your Inspection request saved Successfully',
            data: InspectionsObject
        })
    } catch (error) {
        console.log({error});
        response.json({
            message: 'Oops!, Something went wrong. Please try again...',
            data: []
        })
    }
})
const port = process.env.SERVER_PORT
app.listen(port, ()=> console.log(`Server listening to port ${port}`))