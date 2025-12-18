import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../assets/assets'

const MyOrders = () => {
    const {navigate,currency,} = useAppContext()
    const [myOrders, setMyOrders] = useState([])

    const fetchMyOrders= async()=>{
        return setMyOrders(dummyOrders)
    }
  
    useEffect(()=>{
        fetchMyOrders()
    },[])
      console.log(myOrders)
  return (
    <div className='pb-16'>
         <div className="flex flex-col items-end w-max">
            <p className='text-2xl font-bold uppercase'>My Orders</p>
            <div className='w-16 h-0.5 bg-primary-dull rounded-full'></div>
        </div>
<div className='mt-10'>
   {myOrders.map(order => (
            <div key={order._id} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                <p className='flex justify-between md:items-center max-md:flex-col md:font-medium text-gray-500'>
            <span>OrderId : {order._id}</span>
            <span>Payment : {order.paymentType}</span>
            <span>Total Amount : {currency} {order.amount}</span>
                </p>
                {order?.items.map((item, i)=>(
                    <div key={i}
                    className={`relative bg-white text-gray-500/80 ${order.items.length !== i + 1 && "border-b"} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-6 w-full max-w-4xl`}>
                        <div className='flex items-center mb-4 md:mb-0'>
                            <div className='bg-primary/10 p-4 rounded-lg'>
                                <img src={item?.product?.image[0]} alt="" className='w-16 h-16' />
                            </div>
                            <div className='ml-4'>
                                <h2 className='text-xl font-medium text-gray-500'>Name : {item?.product?.name}</h2>
                                <h2> category : {item?.product?.category}</h2>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center  mb-4 md:mb-0'>
                            <p>Quantity : {item.quantity || 1}</p>
                            <p>Status : {order.status}</p>
                            <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className='text-primary text-lg font-medium'>Amount : {currency} {item.product?.offerPrice * item?.quantity}</p>
                    </div>
                ))}
            </div>
        ))}
 
</div>
        
    </div>
  )
}

export default MyOrders