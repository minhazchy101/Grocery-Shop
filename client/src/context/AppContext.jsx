import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"
import { dummyProducts } from "../assets/assets";

axios.defaults.withCredentials = true; 
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL; 

export const AppContext = createContext()

export const AppContextProvider =({children})=>{

 
    const currency = import.meta.env.VITE_CURRENCY ;
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})
    const [loading, setLoading] = useState(true);
 
    const fetchSellerStatus =async()=>{
        try {
            const {data} =  await axios.get('/api/seller/is-auth')
              if (data.success) {
              return setIsSeller(true)
            }
            else{
                return setIsSeller(false) 
            }
        } catch (error) {
             toast.error(error.message)
             return  setIsSeller(true)
        }
       
    }


  const  fetchUser = async()=>{
    try {
        const {data} = await axios.get('/api/user/is-auth')
       
        if (data.success) {
          setUser(data.user)
          setCartItems(data.user.cartItems)
            }
            else{
                return  setIsSeller(null) 
            }
    } catch (error) {
          setUser(null)
          toast.error(error.message)
    }
    }
    
    // const fetchProducts = async ()=>{
    //     try {
    //        setProducts(dummyProducts)
    //         setLoading(false);
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
           
    //    }
    
    const fetchProducts = async ()=>{
        try {
          const {data} = await axios.get('/api/product/list')
         
          if(data.products){ 
           setProducts(data.products)
           setLoading(false);
        }else{
            toast.error(data.message)
        }
        } catch (error) {
            toast.error(error.message)
        }
           
       }
// console.log('products ->', products)

        useEffect(()=>{
            fetchUser()
            fetchSellerStatus()
            fetchProducts()

        },[])


        const addToCart = (itemId)=>{
             if(!user) {
           toast.error('Please login!'); 
               return setShowLogin(true)
             }
                  let carData = structuredClone(cartItems)
                  if (carData[itemId]) {
                      carData[itemId] += 1 ;
                  }else{
                      carData[itemId] = 1 ;
                  }
                  setCartItems(carData)
                    toast.success("Cart Added")
              }
          
              const updateCartItem = (itemId, quantity)=>{
                  let cartData = structuredClone(cartItems)
                  cartData[itemId]= quantity ;
                  setCartItems(cartData)
                    toast.success("Cart Updated")
              }
          
              const removeFromCartItem = (itemId)=>{
                  let cartData = structuredClone(cartItems)
                 if (cartData[itemId]){
                         cartData[itemId]-= 1 ;
                         if (cartData[itemId] === 0){
                        delete cartData[itemId];
                 }
                 }
                 setCartItems(cartData)
                 toast.success("Removed From cart")
              }

            //   console.log('cartItems', cartItems)

        //  get cart item count
        const getCartCount =()=>{
           let total = 0 ;
           for(const item in cartItems){
            total += cartItems[item]
           }
           return(total)
        }
        

        // get cart total amount 

        const getCartAmount =()=>{
           let totalAmount = 0 ; 
           for (const item in cartItems){
            const itemInfo = products.find(product => product._id === item)
            console.log('itemInfo')
            if (cartItems[item] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[item]
            }
           }
           return Math.floor(totalAmount * 100)/ 100;
        }

        useEffect(()=>{
            const updateCart = async()=>{
                try {
                    const {data}= await axios.post('/api/cart/update', {cartItems})

                    if (!data.success) {
                     return   toast.error(data.message)
                    }
                } catch (error) {
                    toast.error(error.message)
                    
                }
            }
            if(user) {
                updateCart()
            }
        },[cartItems])
   

    const value = {navigate,currency, axios,
        user, setUser, 
        isSeller, setIsSeller,      
        showLogin, setShowLogin,
        products, setProducts,     
        setCartItems , cartItems,
        searchQuery, setSearchQuery, 
        addToCart, removeFromCartItem, updateCartItem,
        getCartCount,getCartAmount,
        fetchProducts,
        loading,
      }
        

    
return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}

export const useAppContext = () =>{
    return useContext(AppContext)
}