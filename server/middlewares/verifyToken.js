import jwt from "jsonwebtoken"
import {User} from "../models/user_model.js";
export const verifyToken = async ( req , res , next ) => {
    
    try {
        const token = req.cookies.authToken ;
        if(!token) {
            return res.status(400).json({success : false , message : "UnAuthorized - no token provided"})
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;

        if(!decoded) {
            return res.status(400).json({success : false , message : "UnAuthorized - invalid token"})
        }

        req.userId = decoded.userId ;
                
        next();
    } catch (error) {
        console.log("Error in verifyToken" , error) ;
        return res.status(500).json({success : false , message : "Server Error"} );
    }
}

export const checkIsAdminOrEnt = async (req , res , next) => {
    try {
        const user = await User.findById(req.userId) ;

        if(!user) {
            return res.status(400).json({success : false , message : "User not found"}) ;
        }

        if(user.role != "admin" && user.role != "entrepreneur") {
            return res.status(400).json({succuss : false , message : "only allowed to admin or entrepreneur"});
        }
        
        next();
    } catch (error) {
        console.log("Error in verifyToken" , error) ;
        return res.status(500).json({success : false , message : "Server Error"} );
    }
}
export const checkIsAdmin = async (req , res , next) => {
    try {
        const user = await User.findById(req.userId) ;

        if(!user) {
            return res.status(400).json({success : false , message : "User not found"}) ;
        }

        if(user.role != "admin") {
            return res.status(400).json({succuss : false , message : "only allowed to admin"});
        }
        
        next();
    } catch (error) {
        console.log("Error in verifyToken" , error) ;
        return res.status(500).json({success : false , message : "Server Error"} );
    }
}