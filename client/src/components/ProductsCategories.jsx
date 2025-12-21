import React from 'react'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../reuse/productCard'

const ProductsCategories = () => {
    const {category} = useParams()
  const {products} = useAppContext()
    const searchCategory = categories.find((item) => item.path.toLowerCase() === category)

    const filterProducts = products.filter(product => product.category.toLowerCase() === category)
    
    
  return (
    <div className='mt-20'>
        <div className="flex flex-col items-end w-max">
            {searchCategory ? <p className='text-2xl font-bold uppercase'>{searchCategory?.text}</p> : <p className='text-2xl font-bold uppercase'>No Category</p>}
           
            <div className='w-16 h-0.5 bg-primary-dull rounded-full'></div>
        </div>
        <div>
            {filterProducts.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
         gap-2 md:gap-6 lg:grid-cols-5 mt-6'>
                    {filterProducts.map(product => (
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </div>
            ) :(
                <div className='flex flex-col items-center justify-center text-sm h-[100px]'>
                    <h2 class="md:text-6xl text-4xl font-semibold text-gray-800">Products Not Found</h2>
                </div>
            )
            
            }
        </div>
    </div>
  )
}

export default ProductsCategories