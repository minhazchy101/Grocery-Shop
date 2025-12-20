import jwt from "jsonwebtoken"

const authSeller = async (req, resizeBy, next)=>{
    const {sellerToken} = req.cookies ; 
      if(!sellerToken) return res.json({success : false, message : "Not Authorized"})

        try {
            const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
            console.log('seller auth -> ', tokenDecode)
            if (tokenDecode.email === process.env.process.env.JWT_SECRET) {
                next()
            }else{
               return  res.json({success : false, message : "Not Authorized"})
               }
               next() 
            } catch (error) {
                console.log('auth seller error -> ', error.message)
               return res.json({success : false, message : error.message})
            }

}

export default authSeller ;