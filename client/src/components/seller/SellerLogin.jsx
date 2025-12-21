import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'


const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate,axios } = useAppContext()
//    const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
    const onSubmitHandler=async (e)=>{
        try {
             e.preventDefault()
             const {data} = await axios.post('/api/seller/login', {email, password})
            
             if (data.success) {
                    setIsSeller(pre => !pre) 
                    toast.success(data.message)
                    navigate('/seller')
             }else{
                toast.error(data.message)
             }
             
        } catch (error) {
            console.log('data error seller => ', error)
            toast.error(error.message)
        }
       
    }
    
    useEffect(()=>{
        if (isSeller) {
         navigate('/seller')
        }
    },[isSeller, navigate])
  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>

        <div className='flex flex-col gap-5 m-auto items-center p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border-gray-200
        '>
            <p className="text-2xl m-auto font-medium"><span className='text-primary'>Seller</span>  Login</p>
            <div className="w-full">
                <p>Email</p>
                <input type="email" 
                onChange={(e)=>{setEmail(e.target.value)}} value={email}
                className='border border-gray-200 rounded-2xl w-full p-2 mt-1 outline-primary' required
                placeholder='Enter your Email' />
            </div>
            <div className="w-full">
                <p>Password</p>
                <input type="password" 
                  onChange={(e)=>{setPassword(e.target.value)}} value={password}
                className='border border-gray-200 rounded-2xl w-full p-2 mt-1 outline-primary' required
                placeholder='Enter your Password' />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
        </div>
        
    </form>
  )
}

export default SellerLogin 