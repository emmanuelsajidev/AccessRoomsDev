const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const helmet = require('helmet');
var useragent = require('express-useragent');
var path = require('path');
const fs = require('fs');


//route inititializations

const agentRoutes=require('./routes/agentRoutes')
const adminRoutes=require('./routes/adminRoutes');
const vendorRoute=require('./routes/vendorRoutes');
const shikaraRoute=require('./routes/shikaraRoute');
const houseBoatRoute=require('./routes/houseBoatRoutes');
const dashboardRoute=require('./routes/dashboardRoute');
const customerRoute=require('./routes/customerRoute');
const shikaraBookingRoutes = require('./routes/shikaraBookingRoutes');
const s3controller=require('./controlize/imageHelperS3');
const policyRoute=require('./routes/policyRoute');
const locationRoute=require('./routes/locationRoute');
const houseBoatBookingRoute=require('./routes/houseBoatBookingRoute');
const aboutusRoutes=require('./routes/aboutusRoute');
const reservationRoute=require('./routes/reservationRoute')
const HouseBoatSearchRoute = require('./routes/houseBoatSearchRoute');
const rescheduleRoute=require('./routes/rescheduleRoute');
const reviewRoute=require('./routes/reviewRoute');


var app = express();
app.use(cors());
app.use(helmet({crossOriginResourcePolicy: false}));
app.options('*', cors());

var server = http.createServer(app);

const port = process.env.PORT ||2222;

mongoose.Promise = global.Promise;
//TEST
// mongoose.connect('mongodb+srv://accessroomsalappuzha:Accessrooms123@cluster0.btjk7li.mongodb.net/',
//LIVE 
mongoose.connect('mongodb+srv://accessroomslive:accessroomslive@cluster0.j2lkyd3.mongodb.net/',


    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("DataBase connected.");
        console.log("Fetched Live Data.")
    },
        err => {
            console.log("db connection error");
            console.log(err)
        });





app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//middleware
app.use(function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
    next();
})
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
app.set('view engine', 'ejs');

// app.get('/u', (req, res) => {
//     s3.readFile(res)
//     return;
// });
// app.get('/wp/:id', (req, res) => {
//     if (req.params.id) {
//         if (path.extname(req.params.id) === ".svg") {
//             s3.readFile(res, req.params.id)
//             return;
//         }
//     }

//     s3.readFile(res, ('wp_' + req.params.id + ".webp"))
//     return;
// });

app.get('/wp', (req, res) => {
    if (req.query.key) {
        if (path.extname(req.query.key) === ".svg") {
            console.log(2)
            s3controller.readtheFile(res, req.query.key)
            return;
        }
    }
    s3controller.readtheFile(res, ('wp_' + req.query.key + ".webp"))
    return;
});
//app.use
app.get('/u/:key', (req, res) => {
    const imageName = req.params.key;
    s3controller.readFile(res, /*('wp_' + imageName + ".webp")*/imageName);
    return;
});

app.get('/health', async (req, res) => {
    res.send({
        status: true,
        d: Date.now(),
        msg: "Use API end point!"
    });
    res.end();
});


app.get('/api/images/:filename', (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, 'files', filename);
  
    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('Image not found');
            return;
        }
        // Send the file
        res.sendFile(imagePath);
    });
});


app.use(agentRoutes)
app.use(adminRoutes);
app.use(vendorRoute);
app.use(houseBoatRoute);
app.use(dashboardRoute);
app.use(customerRoute)
app.use(shikaraBookingRoutes);
app.use(shikaraRoute);
app.use(policyRoute);
app.use(locationRoute);
app.use(houseBoatBookingRoute);
app.use(aboutusRoutes);
app.use(reservationRoute);
app.use(HouseBoatSearchRoute);
app.use(rescheduleRoute);
app.use(reviewRoute);



server.listen(port, () => {
    console.log(`Server with ws capability running on port ${port}`);
    console.log("Database Connection Initiated")
});