const express = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/BMS1");
const app = express();

const isBlog = require('./middlewares/isBlog');

app.use(isBlog.isblog);

// For admin routes
const adminRoute = require('./routes/adminRoute');
app.use('/',adminRoute);

// For user routes
const userRoute = require('./routes/userRoute');
app.use('/',userRoute);

// For blog routes
const blogRoute = require('./routes/blogRoute');
app.use('/',blogRoute);

app.listen(4000,function(){

    console.log("Server is running");
})

