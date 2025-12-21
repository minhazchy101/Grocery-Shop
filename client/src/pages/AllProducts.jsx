import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../reuse/productCard'

const AllProducts = () => {
    const {searchQuery, products} = useAppContext()
  const [filteredProducts, setFilteredProducts] = useState([])
  const isLoading = !products || products.length === 0;
    useEffect(()=>{
     if (searchQuery.length > 0) {
     setFilteredProducts(
    products.filter(product =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
}else{
  setFilteredProducts(products)
}

    },[products, searchQuery])
    // console.log('Products => ', products)
    console.log('filteredProducts => ', filteredProducts)
    
    if (isLoading) {
        return <p className="mt-20 text-center text-gray-500">Loading products...</p>
    }

    if (filteredProducts.length === 0) {
        return <p className="mt-20 text-center text-gray-500">No products found.</p>
    }
  return (
    <div className='flex flex-col mt-20'>
        <div className="flex flex-col items-end w-max">
            <p className='text-2xl font-bold uppercase'>All Products</p>
            <div className='w-16 h-0.5 bg-primary-dull rounded-full'></div>
        </div>
 
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
         gap-2 md:gap-6 lg:grid-cols-5 mt-6'>
         
          {filteredProducts?.length > 0 && filteredProducts?.filter((product) => product.inStock).map((product,i) => (
          <ProductCard key={i} product={product}/>
          ))}
        </div>
    </div>
  )
}

export default AllProducts