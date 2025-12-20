import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// user register : /api/user/register
export const register = async (req, res)=>{
    try {
        console.log(req.body)
        const {name, email, password } = req.body ; 

        if (!name || !email || !password) return res.json({success : false, message : "Missing Details"})
            const existingUser = await User.findOne({email})
           if(existingUser) return res.json({success : false, message : "User already Exists"})

        const hashPass = await bcrypt.hash(password, 10)

        const user = await User.create({name, email, password : hashPass})

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly : true, 
            secure : process.env.NODE_ENV === 'production' ,
            sameSite :  process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        res.json({success : true, message : "User Created SuccessFully", user})

    } catch (error) {
        console.log('create user error -> ', error.message)
        return res.json({success : false, message : error.message})
    }
}

// user login : /api/user/login

export const login = async (req, res)=>{
    try {
         console.log(req.body)
        const {email, password } = req.body ; 

        if ( !email || !password) return res.json({success : false, message : "Missing Credentials"})

             const user = await User.findOne({email})

             if(!user) return res.json({success : false, message : "User is not defined"})

              const isMatch = await bcrypt.compare(password, user.password)  
                if(!isMatch) return res.json({success : false, message : "Missing User Credentials"})

                const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "7d"})
                res.cookie('token', token, {
                    httpOnly : true, 
            secure : process.env.NODE_ENV === 'production' ,
            sameSite :  process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
                })
        res.json({success : true, message : "User Login SuccessFully", user})

    } catch (error) {
        console.log('create user error -> ', error.message)
        return res.json({success : false, message : error.message})
    }
}


// is Auth : /api/user/is-auth
export const isAuth = async (req, res)=>{
   
    try {
        const {userId} = req.body ;
        const user = await User.findById(userId).select("-password")
     return res.json({success : true, message : "User Authenticate SuccessFully", user})

    } catch (error) {
        console.log('is Auth error -> ', error.message)
        return res.json({success : false, message : error.message})
    }
}

// user logout : /api/user/logout
export const logout = async (req, res)=>{
    try {
       res.clearCookie('token', {
            httpOnly : true, 
            secure : process.env.NODE_ENV === 'production' ,
            sameSite :  process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        }) 
      res.json({success : true, message : "User logout SuccessFully"})


    } catch (error) {
        console.log('logout error -> ', error.message)
        return res.json({success : false, message : error.message})
    }
}