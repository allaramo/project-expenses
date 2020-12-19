const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const categoryRoutes = require('./routes/category.routes');
const subcategoryRoutes = require('./routes/subcategory.routes');
const app = express();

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log("Connected to DB");
})
.catch(()=>{
  console.log("Connection to DB failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/category', categoryRoutes);
app.use('/subcategory', subcategoryRoutes);

module.exports = app;
