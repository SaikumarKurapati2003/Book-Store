import User from "../model/user.modal.js"
import bcryptjs from "bcryptjs"
export const signUp = async(req,res)=>{
    try{
        const {fullname,email,password} = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashPassword = await bcryptjs.hash(password,10);
        const createdUser =  new User({
            fullname,
            email,
            password: hashPassword,
        })
        await createdUser.save();
        return res.status(201).json({message:"User created successfully",user:{
            _id: createdUser._id,
            fullname: createdUser.fullname,
            email: createdUser.email,
        }});

    } catch(error){
        console.log("Error: ",error.message);
        res.status(500).json({message:"Internet server error"});
    }
};

export const login = async(req,res)=>{
    try{
        console.log(req.body);
        const {email,password} = req.body;
        console.log(email,password);
        const user = await User.findOne({email});
        console.log("user: ",user);

        const isMatch = await bcryptjs.compare(password,user.password);
        console.log("isMatch: ",isMatch);

        if(!user || !isMatch){
            return res.status(400).json({message:"Ivalid credentials"});
        }else{
            res.status(200).json({message:"Login successful",user:{
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
                },
            });
        }
    }catch(error){
        console.log("Error: ",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}