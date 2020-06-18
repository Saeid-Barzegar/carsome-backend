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
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
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
            data: {}
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
    InspectionsObject.save()
    response.json({
        message: 'new Inspection saved Successfully',
        data: InspectionsObject
    })
})
const port = process.env.SERVER_PORT
app.listen(port, ()=> console.log(`Server listening to port ${port}`))