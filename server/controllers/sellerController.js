import jwt from "jsonwebtoken"

export const sellerLogin =async(req, res)=>{
        const {email, password} = req.body ;

      try {
          if (email === process.env.SELLER_EMAIL && password === process.env.PASSWORD) {
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn : '7d'})

          res.cookie("sellerToken", token, {
            httpOnly : true, 
            secure : process.env.NODE_ENV === 'production' ,
            sameSite :  process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
          })  
           res.json({success : true, message : "Seller Login SuccessFully"})
        }

      }catch (error) {
        console.log('seller login error -> ', error.message)
        return res.json({success : false, message : error.message})
    }
}


// sellerAuth : /api/user/is-auth
export const isSellerAuth = async (req, res)=>{
   
    try {
       
     return res.json({success : true, message : "User Authenticate SuccessFully"})

    } catch (error) {
        console.log('sellerAuth error -> ', error.message)
        return res.json({success : false, message : error.message})
    }
}

// sellerLogout : /api/user/logout
export const sellerLogout = async (req, res)=>{
    try {
       res.clearCookie('sellerToken', {
            httpOnly : true, 
            secure : process.env.NODE_ENV === 'production' ,
            sameSite :  process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        }) 
      res.json({success : true, message : "seller logout SuccessFully"})


    } catch (error) {
        console.log('logout error -> ', error.message)
        return res.json({success : false, message : error.message})
    }
}