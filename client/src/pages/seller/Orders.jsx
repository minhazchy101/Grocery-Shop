import React, { useEffect, useState } from 'react'
import { assets, dummyOrders } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Orders = () => {
   const {currency,} = useAppContext()
  const [orders, setOrders] = useState([])
  const fetchOrders = ()=>{
    setOrders(dummyOrders)
  }
  useEffect(()=>{
    fetchOrders()
  },[orders])
  console.log(orders)
  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
      <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col md:flex-row justify-between  md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                    <div className="flex gap-5 max-w-80 items-center">
                        <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
                        <>      <div  className="flex flex-col justify-center gap-2">
                            {order.items.map((item, index) => (
                          
                                    <p key={index} className="font-medium">
                                        {item.product.name} <span className={`text-primary ${item.quantity < 2 && "hidden"}`}> x {item.quantity}</span>
                                    </p>
                               
                            ))}
                             </div>
                        </>
                    </div>

                    <div className="text-sm max-w-md">
                        <p className='font-medium mb-1'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}, {order.address.state},{order.address.zipcode}, {order.address.country}</p>
                
                        <p>{order.address.phone}</p>
                    </div>

                    <p className="font-medium text-base my-auto text-black/70">{currency} {order.amount}</p>

                    <div className="flex flex-col text-sm">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {order.orderDate}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Orders ;