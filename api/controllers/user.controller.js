import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js'
export const test=(req, res) => {
    res.send("Hello World");
  }

 export const updateUser = async (req, res, next) => {
  
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Unauthorized'));
    }
  
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(401, "Password must be at least 6 characters."));
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
  
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(errorHandler(401, "Username must be between 7 and 20 characters."));
      }
      if (req.body.username.includes(" ")) {
        return next(errorHandler(401, "Username cannot contain spaces."));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(401, "Username must be lowercase."));
      }
      if (req.body.username.match(/[^a-zA-Z0-9]+$/)) {
        return next(errorHandler(400, "Username can only contain letters and numbers."));
      }
    }
  
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        } },
        { new: true } 
      );
      const { password, ...rest } = updateUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  

  export const deleteUser=async(req,res,next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Unauthorized'));
    }
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  export const signOut =(req,res,next)=>{
    
    try {
      res.clearCookie('access_token',{
        sameSite:'none',
        secure:true
      }).status(200).json("User has been logged out")
      
    } catch (error) {
      next(error);
    }
  }