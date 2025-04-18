import { useState, useRef, useEffect } from 'react';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useSelector,useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate=useNavigate();
  const dispatch= useDispatch();
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hadnleSignout=async()=>{
      try {
        const res=await fetch('/api/user/signout',{
            method:'POST'
        })
        const data=await res.json();
        if(!res.ok){
          console.log(data.message)
        }else{
          dispatch(signoutSuccess());
          navigate('/sign-in')
        }
      } catch (error) {
        console.log(error.message)  
      }
  
    }  
  return (
    <Navbar className=' border-b-2 flex flex-wrap justify-between items-center px-4 py-3 '>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded'>
          Teja's
        </span>
        Blog 
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          className='hidden lg:inline'
        />
      </form>

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <FiSearch />
      </Button>

      <div className='hidden sm:flex gap-6'>
        {['/', '/about', '/projects'].map((path, i) => (
          <Link
            key={i}
            to={path}
            className={`${pathname === path ? 'font-bold text-blue-600' : 'text-green-500 font-bold'}`}
          >
            {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
          </Link>
        ))}
      </div>

      <div className='flex items-center gap-2 relative'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
          <FaMoon />
        </Button>

        {currentUser ? (
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
              <img
                src={currentUser.profilePicture}
                alt={currentUser.name}
                className="w-9 h-7 rounded-full object-cover"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-900">@{currentUser.username}</p>
                  <p className="text-sm font-medium text-gray-500 truncate">{currentUser.email}</p>
                </div>
                <ul className="py-1">
                  <li>
                    <Link
                      to="dashboard?tab=profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <hr className="my-1 border-gray-200" />
                  <li>
                    <button
                      onClick={hadnleSignout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to='/sign-in'>
            <Button gradientduotone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}

        <Button onClick={() => setIsOpen(!isOpen)} color='gray' className='sm:hidden'>
          <HiMenu />
        </Button>
      </div>

      {isOpen && (
        <div className='w-full mt-2 sm:hidden'>
          <ul className='flex flex-col gap-2'>
            {['/', '/about', '/projects'].map((path, i) => (
              <li key={i} className={`${pathname === path ? 'font-bold text-blue-600' : 'text-green-500 font-bold'}`}>
                <Link to={path}>{path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Navbar>
  );
}
