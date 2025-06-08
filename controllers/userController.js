import User from "../models/user.js";
import bcrypt from "bcrypt";





export function saveUSer(req,res){

const hashedPassword = bcrypt.hashSync(req.body.password,10)
const user =new User (
    {
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : hashedPassword
    }


)
user.save().then(()=>{
    res.json({
        message : " User Saved successfully"
    })
}).catch(()=>{
    res.status(500).json({
        message : "User not saved"
    })
})









}