const express=require('express');
const bodyParser=require('body-parser');
const cors =require('cors');
const postRoutes=require('./routes/Posts.js');
const authRoutes=require('./routes/Users.js');
const app=express();
const sequelize=require('./Database');
const postMessage=require('./models/postMessage');
const User=require('./models/User')
const fileUpload = require("express-fileupload");
const e = require('cors');
const path =require('path');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(fileUpload());

app.use(express.static('Uploads'));

app.use(cors({
    origin:'http://localhost:3000'
  }));

app.use('/posts',postRoutes);

app.use('/auth',authRoutes);



sequelize.sync()
.then(result=>{
const PORT=8000;
app.listen(PORT,()=>{
    console.log("server is listening in 8000")
})
})
.catch(err=>{
  console.log(err);
})