import React from 'react'
import {assets, features} from '../assets/assets'

const BottomBanner = () => {
    
  return (
    <div className='relative mt-16'>
        <img src={assets.bottom_banner_image} alt="bottom_banner_image" className='w-full hidden md:block' />
        <img src={assets.bottom_banner_image_sm} alt="bottom_banner_image" className='w-full md:hidden' />

        <div className='absolute inset-0 top-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-5 md:pr-24'>
    <div>
        <h1 className='text-2xl md:text-3xl font-semibold text-primary'>Why we are the Best? </h1>
        {features.map((feature, i) => (
            <div key={i} className='flex items-center gap-4 mt-4 border border-primary-dull bg-white px-3 py-1 rounded-md hover:shadow-2xl'>
                <img src={feature.icon} alt={feature.title} className='md:w-11 w-9' />
                <div>
                <h1 className='text-md md:text-xl  font-semibold'>{feature.title}</h1>         
                <p className='text-gray-500/70 text-xm md:text-sm'>{feature.description}</p>
                </div>
            </div>
        ))}
    </div>
        </div>
    </div>
  )
}

export default BottomBanner