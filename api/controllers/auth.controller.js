import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup=async(req, res,next) => {
     const {username,email,password}=req.body;
        if(!username||!password||!email||username===""||password===""||email===""){ 
          next(errorHandler(400,'All fields are required'))
        }
        
    const hashedPassword =bcryptjs.hashSync(password, 10);
    const newUser=new User({
        username, 
        email,
        password:hashedPassword
    });
    try {
        await newUser.save();
        res.status(201).json({message:"User created successfully"});
    } catch (error) {
       next(error);
    }
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password||email===""||password===""){
        next(errorHandler(400,'All fields are required'));
    }
    try {
        const user=await User.findOne({email});
        if(!user){
           return  next(errorHandler(404,'User not found'));
        }
        const isValidPassword=bcryptjs.compareSync(password,user.password);
        if(!isValidPassword){
            return next(errorHandler(401,'Invalid credentials'));
        }
        const {password:pass,...rest}=user._doc;

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'100d'});
        res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
    } catch (error) {
        return next(error);
    }
}

export const google=async(req,res,next)=>{
    try {
        const {name,email,googlePhotoUrl}=req.body;
        const user=await User.findOne({email});
        if(user){
            const {password,...rest}=user._doc;
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1 d'});
            res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
        }else{
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword=bcryptjs.hashSync(generatedPassword,10);  
            const newUser=new User({
                username:name.toLowerCase().split(" ").join("")+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoUrl
            });
            await newUser.save();
            const {password,...rest}=newUser._doc;
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1 d'});
            res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
        }
    } catch (error) {
        next(error);    
    }       
}