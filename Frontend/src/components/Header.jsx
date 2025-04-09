import { useState } from 'react';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

export default function Header() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar className='border-b-2 flex flex-wrap justify-between items-center px-4 py-3 '>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
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

      {/* Desktop Nav Links */}
      <div className='hidden sm:flex gap-6'>
        <Link to='/' className={`${pathname === '/' ? 'font-bold text-blue-600' : 'text-green-500 font-bold'}`}>
          Home
        </Link>
        <Link to='/about' className={`${pathname === '/about' ? 'font-bold text-blue-600' :  'text-green-500 font-bold'}`}>
          About
        </Link>
        <Link to='/projects' className={`${pathname === '/projects' ? 'font-bold text-blue-600' :  'text-green-500 font-bold'}`}>
          Projects
        </Link>
      </div>

      {/* Right Side Controls */}
      <div className='flex items-center gap-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        <Link to='/sign-in'>
          <Button gradientduotone='purpleToBlue' outline>
            Sign In
          </Button>
        </Link>
        {/* Hamburger Menu for Small Screens */}
        <Button onClick={() => setIsOpen(!isOpen)} color='gray' className='sm:hidden'>
          <HiMenu />
        </Button>
      </div>

      {/* Collapsible Menu for Mobile */}
      {isOpen && (
        <div className='w-full mt-2 sm:hidden'>
          <ul className='flex flex-col gap-2'>
            <li className={`${pathname === '/' ? 'font-bold text-blue-600' : 'text-green-500 font-bold'}`}>
              <Link to='/'>Home</Link>
            </li>
            <li className={`${pathname === '/about' ? 'font-bold text-blue-600' :'text-green-500 font-bold'}`}>
              <Link to='/about'>About</Link>
            </li>
            <li className={`${pathname === '/projects' ? 'font-bold text-blue-600' :'text-green-500 font-bold'}`}>
              <Link to='/projects'>Projects</Link>
            </li>
          </ul>
        </div>
      )}
    </Navbar>
  );
}
