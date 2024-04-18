import userModel from "../models/userModel.js";
import { createTransport } from "nodemailer"
import crypto from "crypto"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

// Route to handle "forgot password" request
const forgotPassword = async (req, res) => {
   
    
    res.status(200).json({ message: 'A link to reset your password have been sent to your email.' });
  };
  
//  Route to handle password reset request
const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    
    // Verify reset token
    console.log("token: ", token);
    const user = await userModel.findOne({ resetToken:token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    
    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = null;
    await user.save();
    
    res.status(200).json({ message: 'Password reset successful' });
  };
 export {forgotPassword, resetPassword}
  
