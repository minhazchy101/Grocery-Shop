import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, setShowLogin, axios, navigate,searchQuery, setSearchQuery, getCartCount } = useAppContext();

  const logout = async () => {
    try {
      const {data} = await axios.get('/api/user/logout')
       if (data.success) {
            setUser(null)
            navigate('/')
            toast.success(data.message)
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
           toast.error(error.message)
    }
  };

  useEffect(()=>{
    if (searchQuery.length > 0) {
      navigate('/products')
    }
  },[navigate, searchQuery])

  const navItems = [
    {
    name : "Home", to : '/'
  },
    {
    name : "All Products", to : '/products'
  },
    
]

  return (
    <div className="fixed top-0 left-0 w-full shadow-md z-50 bg-white/85">
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 ">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="hover:scale-110 transition-all duration-300"
        >
          <img src={assets.logo} alt="logo" className="h-7 cursor-pointer" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          {navItems.map((item , i)=>(
            <NavLink
  key={i}
  to={item.to}
  className={({ isActive }) =>
    `
    relative pb-1 text-primary
    transition-all duration-300 ease-in-out
    hover:scale-105

    after:content-['']
    after:absolute after:left-0 after:bottom-0
    after:h-0.5 after:bg-primary-dull
    after:transition-all after:duration-300 after:ease-in-out

    ${
      isActive
        ? "after:w-full scale-105 font-medium"
        : "after:w-0 hover:after:w-full"
    }
    `
  }
>
  {item.name}
</NavLink>


          ))}
         
        

          <div className="hidden xl:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
              onChange={(e)=> setSearchQuery(e.target.value)}
            />
            <img
              src={assets.search_icon}
              alt="search_icon"
              className="w-4 h-4"
            />
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img
              src={assets.cart_icon}
              alt="cart_icon"
              className="w-6 opacity-80"
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>

          {!user ? (
            <button
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
              onClick={() => (setOpen(false), setShowLogin((pre) => !pre))}
            >
              Login
            </button>
          ) : (
            <div className="relative group cursor-pointer">
              <img
                src={assets.profile_icon}
                alt="profile_icon"
                className="w-10"
              />
              <ul
                className="
    opacity-0 scale-95 pointer-events-none 
    group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
    absolute top-10 right-1 border border-gray-300 bg-white shadow-2xl py-2.5 w-30
    rounded-lg text-sm z-40 text-center transition-all duration-300
"
              >
                <li className="p-1.5 pl-3 hover:text-primary-dull cursor-pointer">
                  {" "}
                  <NavLink to="/my-orders">My Orders</NavLink>
                </li>
                <li>
                  {" "}
                  <button
                    className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>{" "}
                </li>
              </ul>
            </div>
          )}
        </div>
<div className="flex sm:hidden items-center gap-5">
<div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img
              src={assets.cart_icon}
              alt="cart_icon"
              className="w-6 opacity-80"
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="search_icon" className="w-4 h-4" />
        </button>
</div>

        {/* Mobile Menu */}
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <NavLink onClick={() => setOpen(false)} to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/products">
            All Products
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/contact">
            Contact
          </NavLink>
          {user && (
            <NavLink onClick={() => setOpen(false)} to="/myOrders">
              My Orders
            </NavLink>
          )}
          {!user ? (
            <button
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
              onClick={() => (setOpen(false), setShowLogin((pre) => !pre))}
            >
              Login
            </button>
          ) : (
            <button
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
