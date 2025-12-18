import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
import Login from './components/Login'
import { useAppContext } from './context/AppContext'
import AllProducts from './pages/AllProducts'
import ProductsCategories from './components/ProductsCategories'
import ProductsDetails from './pages/ProductsDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProducts from './pages/seller/AddProducts'
import ProductsList from './pages/seller/ProductsList'
import Orders from './pages/seller/Orders'

const App = () => {
  const theSeller = useLocation().pathname.includes("seller")
   const {showLogin, isSeller} = useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-500 bg-white'>
      <Toaster/>
   {!theSeller &&   <Navbar/>}
   {showLogin && <Login/>}
      <div className={`${!theSeller && " px-6 md:px-16 lg:px-24 xl:px-32 py-4" }  mt-20`}>
        <Routes>
          <Route path='/' element={<Home/>}/>
         <Route path='/products' element={<AllProducts/>}/>
         <Route path='/products/:category' element={<ProductsCategories/>}/>
         <Route path='/products/:category/:id' element={<ProductsDetails/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/add-address' element={<AddAddress/>}/>
         <Route path='/my-orders' element={<MyOrders/>}/>
         <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
      <Route index element={isSeller ? <AddProducts/> : null}/>
      <Route path='product-list' element={<ProductsList/>}/>
      <Route path='orders' element={<Orders/>}/>
         </Route>
        </Routes>
      </div>
   {!theSeller &&   <Footer/>}
    </div>
  )
}

export default App