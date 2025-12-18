import React  from 'react'
import ProductCard from '../reuse/productCard'

import { useAppContext } from '../context/AppContext'

const BestSellers = () => {
    const {products, cartItems} = useAppContext()
   
   
   console.log( cartItems)
  return (
    <div className='mt-16'>
         <p className='text-2xl md:text-4xl font-bold'>Total Best Sellers : {products.length}</p>
         <p className='text-md  font-semibold mt-8'>Here is some Best Sellers : </p>
        
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-6 gap-6'>
     {products.filter(product => product.inStock).slice(0, 8).map(product => (
      <ProductCard key={product._id} product={product} />
     ))}
    </div>    
    </div>
  )
}

export default BestSellers