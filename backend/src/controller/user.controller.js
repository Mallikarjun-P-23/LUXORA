import {asyncHandler} from '../utils/asyncHandler.js';


const registerUser = asyncHandler(async (req,res)=>{
    const {
        usernaame,email,password 
    }= req.body;


    const existedUser= await User.findOne({
        $or: [{
            username : username,
            email:email
        }]
    })
})