import React from 'react'
import {categories} from '../assets/assets'
import { useAppContext } from '../context/AppContext'
const Categories = () => {
  const {navigate} = useAppContext()
 
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-4xl font-bold'>Total categories : {categories.length}</p>
 
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
    
      {categories.map((category , i)=>{
        {/* card */}
       return <div key={i} className='group py-5 px-3 gap-3 rounded-md flex flex-col justify-center items-center shadow-2xl border border-gray-200 cursor-pointer'
       style={{backgroundColor : category.bgColor}}
       onClick={()=>{
        navigate(`/products/${category?.path.toLowerCase()}`)
        scrollTo(0, 0)
       }}>
          <img src={category.image} alt="category.image" className='w-30 group-hover:scale-108 transition-all duration-300'/>
          <p className='text-sm font-semibold'>{category.text}</p>
        </div>
    })}
      </div>
    </div>
  )
}

export default Categories