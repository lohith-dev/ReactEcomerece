const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const User = require('../models/User');
require('dotenv').config();



exports.getAuth=async (req,res)=>{

    const client =new OAuth2Client(
        process.env.Google_client_id,
        process.env.Google_client_secret
    );

    const token=req.body.credential;
    const ticket=await client.verifyIdToken({
        idToken:token,
        audience:process.env.Google_client_id,
    });

    // console.log(ticket.getPayload());

    res.send({result:ticket.getPayload(),token:token});
}

exports.signin = async (req,res)=>{
    const {email,password}=req.body;

    try {
        const existingUser = await User.findOne({email:email});

        if(!existingUser) return res.status(404).json({message:"User doesn't exist.."});

        const isPasswordCorrect= await bcrypt.compare(password,existingUser.password);
 
        if(!isPasswordCorrect) return res.status(404).json({message:"Invalid credentials"});

        const token = jwt.sign({email:existingUser.email,id:existingUser.id},'test',{expiresIn:"1h"});

        res.status(200).json({result:existingUser,token})
    }catch(err){
        res.status(500).json({message:'Something went wrong. '})
    }
}

exports.signup = async (req,res)=>{
    const {firstname,lastname,email,password}=req.body;
    console.log("hello0000000000000000");
    console.log(req.body.Email);
   try{
    const existingUser=await User.findOne({where:{email:email}});
    console.log(existingUser);
    if(existingUser) return res.status(404).json({message:"User already exists.."});

    const hashedPassword =await bcrypt.hash(password,12);
    console.log(hashedPassword);
    const result = await User.create({email:email,username:`${firstname} ${lastname}`,password:hashedPassword,});

    const token = jwt.sign({email:result.email,id:result.id},'test',{expiresIn:"1h"});

    res.status(200).json({result, token})
   }catch(err){

    console.log("herrrrrrrrrrrrrrr");
    res.status(500).json({message:'Something went wrong. '});

   }
}