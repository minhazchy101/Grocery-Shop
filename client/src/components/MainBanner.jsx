import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'
const MainBanner = () => {
  return (
   
        <div className='relative'>
            <img src={assets.main_banner_bg} alt="" className='w-full hidden md:block' />
            <img src={assets.main_banner_bg_sm} alt="" className='w-full md:hidden block' />
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0
      px-4 md:pl-18 lg:pl-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>Freshness You Can Trust, Savings You will Love!</h1>
      

      <div className='flex items-center mt-6 font-medium'>
        <Link to={"/products"} className='flex group items-center gap-2 px-7 md:px-9 py-3 rounded-md text-white transition bg-primary hover:bg-primary-dull cursor-pointer'>
        Shop Now
        <img src={assets.white_arrow_icon} alt="" className='group-hover:translate-x-1 md:hidden' /></Link>
        <Link  to={"/products"} className='hidden  md:flex group items-center gap-2 px-7 md:px-9 py-3 rounded-md text-primary transition  hover:text-black cursor-pointer'>
        Explore Deals
        <img src={assets.black_arrow_icon} alt="" className='group-hover:translate-x-1 ' /></Link>
      </div>
      </div>
    </div>
  )
}

export default MainBanner