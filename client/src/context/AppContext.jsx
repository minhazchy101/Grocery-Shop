import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";


export const AppContext = createContext()

export const AppContextProvider =({children})=>{

 
    const currency = import.meta.env.VITE_CURRENCY ;
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(true)
    const [showLogin, setShowLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})
 

    
    const fetchProducts = async ()=>{
           setProducts(dummyProducts)
       }
        useEffect(()=>{
            fetchProducts()
        },[])


        const addToCart = (itemId)=>{
                  let carData = structuredClone(cartItems)
                  if (carData[itemId]) {
                      carData[itemId] += 1 ;
                  }else{
                      carData[itemId] = 1 ;
                  }
                  setCartItems(carData)
                  toast.success("Added cart")
              }
          
              const updateCartItem = (itemId, quantity)=>{
                  let cartData = structuredClone(cartItems)
                  cartData[itemId]= quantity ;
                  setCartItems(cartData)
                    toast.success(" cart Updated")
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
            console.log(itemInfo)
            if (cartItems[item] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[item]
            }
           }
           return Math.floor(totalAmount * 100)/ 100;
        }

        
   

    const value = {navigate,currency, 
        user, setUser, 
        isSeller, setIsSeller,      
        showLogin, setShowLogin,
        products, setProducts,     
        setCartItems , cartItems,
        searchQuery, setSearchQuery, 
        addToCart, removeFromCartItem, updateCartItem,
        getCartCount,getCartAmount,
      }
        

    
return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}

export const useAppContext = () =>{
    return useContext(AppContext)
}