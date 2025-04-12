import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
      type:String,
      required:true,
  },
  password:{
    type:String,    
    required:true,
  },
  profilePicture:{
    type:String,    
    default:"https://static.vecteezy.com/system/resources/thumbnails/029/271/062/small_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg",
  }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;