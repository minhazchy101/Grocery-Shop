import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSellers'
import BottomBanner from '../components/BottomBanner'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
<MainBanner/>
<Categories/>
<BestSellers/>
<BottomBanner/>
<Newsletter/>
    </div>
  )
}

export default Home