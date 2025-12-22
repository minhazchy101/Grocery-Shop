import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    navigate,
    currency,
    addToCart,
    removeFromCartItem,
    getCartCount,
    getCartAmount,
    updateCartItem,
    cartItems,
    axios, user
  } = useAppContext();
  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
 const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const item in cartItems) {
      const product = products.find((pd) => pd._id === item);
      product.quantity = cartItems[item];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getAddress = async ()=>{
    try {
      const {data} = await axios.get('/api/address/get')
     
      if (data.success) {
        setAddress(data.address)
        if(data.address.length > 0){
          setSelectedAddress(data.address[0])
        }
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);
  useEffect(()=>{
    if(user) return getAddress()
  },[user])
//   console.log(cartArray);
const placeOrder = async ()=>{
    toast.success('place Order..')
}
console.log('selectedAddress', selectedAddress)

  return (
    products.length > 0 && (
      <div className="flex flex-col md:flex-row mt-20  w-full">
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-primary">
              {getCartCount()} Items
            </span>
          </h1>
 {cartArray && cartArray.length > 0 ? (
  <div className="space-y-4">
    {/* Header */}
    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-sm font-semibold border-b pb-3">
      <p>Product</p>
      <p className="text-center">Subtotal</p>
      <p className="text-center">Action</p>
    </div>

    {/* Cart Items */}
    {cartArray.map((product, index) => (
      <div
        key={index}
        className="grid grid-cols-[2fr_1fr_1fr] items-center bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
      >
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <div
            className="w-24 h-24 border rounded-lg overflow-hidden cursor-pointer bg-gray-50"
            onClick={() => {
              navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition"
            />
          </div>

          <div>
            <p className="font-semibold text-gray-800">{product.name}</p>
            <p className="text-sm text-gray-500">
              Weight: {product.weight || "N/A"}
            </p>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-gray-500">Qty</span>
              <select
                value={cartItems[product._id]}
                onChange={(e) =>
                  updateCartItem(product._id, Number(e.target.value))
                }
                className="border rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-black/10"
              >
                {Array(
                  cartItems[product._id] > 9
                    ? cartItems[product._id]
                    : 9
                )
                  .fill("")
                  .map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Price */}
        <p className="text-center font-semibold text-gray-800">
          {currency}
          {product.offerPrice * product.quantity}
        </p>

        {/* Remove */}
        <button
          onClick={() => removeFromCartItem(product._id)}
          className="mx-auto p-2 rounded-full hover:bg-red-50 transition"
        >
          <img
            src={assets.remove_icon}
            alt="Remove"
            className="w-5 h-5"
          />
        </button>
      </div>
    ))}

    <button 
         onClick={()=> {navigate(`/products`);scrollTo(0,0)} } className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
           <img src={assets.black_arrow_icon} alt="" className="rotate-180"/>
            Continue Shopping
          </button>
  </div>
) : (
  <div className="flex flex-col items-center justify-center py-16 text-gray-500 space-y-4">
    <p className="text-lg font-medium">Your cart is empty</p>
    <button 
         onClick={()=> {navigate(`/products`);scrollTo(0,0)} } className=" group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
           <img src={assets.black_arrow_icon} alt="" className="rotate-180"/>
            Start adding products to see them here
          </button>
  </div>
)}


          
        </div>

        <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
          <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
          <hr className="border-gray-300 my-5" />

          <div className="mb-6">
            <p className="text-sm font-medium uppercase">Delivery Address</p>
            <div className="relative flex justify-between items-start mt-2 gap-2">
              <p className="text-gray-500">
                {selectedAddress ? `${selectedAddress?.country}, ${selectedAddress?.state}, ${selectedAddress?.city}, ${selectedAddress?.street}` : 'No address found'}
                </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-primary hover:underline cursor-pointer"
              >
                Change
              </button>
              {showAddress && (
                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                    {address.map((add, i)=>{
                         <p
                         key={i}
                    onClick={() => {setSelectedAddress(add); setShowAddress(false)}}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                   {add.country},
                   
                  </p>
                    })}
                 
                  <p
                    onClick={() => navigate('/add-address')}
                    className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                  >
                    Add address
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

            <select onChange={(e)=> setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <hr className="border-gray-300" />

          <div className="text-gray-500 mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Price</span>
              <span>{currency} {getCartAmount()}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-600">Free</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (2%)</span>
              <span>{currency} {getCartAmount() * 2/ 100}</span>
            </p>
            <p className="flex justify-between text-lg font-medium mt-3">
              <span>Total Amount:</span>
              <span>{currency} {getCartAmount() * 2/ 100 + getCartAmount()}</span>
            </p>
          </div>

          <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">{paymentOption === "COD" ? "Place Order" : "Proceed to checkout"}
            
          </button>
        </div>
      </div>
    )
  );
};

export default Cart;
