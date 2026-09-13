import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Header() {

  const linkStyles = ({ isActive }) => 
    `text-sm font-medium transition-colors duration-200 ${
      isActive 
        ? 'text-blue-600 font-semibold' 
        : 'text-gray-600 hover:text-gray-900'
    }`;


    const loggedIn = useSelector(state =>state.auth.status); 
    const navigate = useNavigate();

    const navItems = [
      {
        name:"home",
        slug:"/",
        active:true
      },
      {
        name:"All Posts",
        slug:"/all-posts",
        active:loggedIn
      },
      {
        name:"Add Blog",
        slug:"/add-blog",
        active:loggedIn
      }
    ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand Link */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800 tracking-tight">
              MyLogo
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item)=>(
              item.active && <NavLink  
                to={item.slug}
                className={linkStyles}
              >
                {item}
              </NavLink>
            ))}
          </nav>
          
          {/* Action Button */}
          {!loggedIn ? <div>
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Signup
            </Link>
          </div>
          :
            <Link 
              to="/logout" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Logout
            </Link>          
          }
          

        </div>
      </div>
    </header>
  );
}
