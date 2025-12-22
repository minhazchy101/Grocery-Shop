import jwt from "jsonwebtoken"
import User from "../models/User.js";

const authUser = async (req, res, next)=>{
  
        const {token} = req.cookies ;

        if(!token) return res.json({success : false, message : "Not Authorized"})

            try {
               const tokenDecode = jwt.verify(token, process.env.JWT_SECRET) 
      
                const user = await User.findById(tokenDecode.id).select("-password")

    if (!user) {
      return res.status(401).json({ success: false, message: "Not Authorized" })
    }
                
                // ✅ attach user to request
                req.user = user
                req.userId = tokenDecode.id ;
                next() 
            } catch (error) {
                console.log('auth user error -> ', error.message)
               return res.json({success : false, message : error.message})
            }


}

export default authUser ;