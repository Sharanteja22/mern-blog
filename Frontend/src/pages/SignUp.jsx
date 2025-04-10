import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react'
import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
            <Link to='/' className='   font-bold text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded'>
                Teja's
              </span>
              Blog 
            </Link>
            <p className='text-sm mt-5'>
              Wanna explore on some interesting topics?<br/>
              Sign up here!<br/>  
            </p>
        </div>
        <div className='flex-1'>
            <form className='flex flex-col gap-6'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="username" className="text-sm font-medium text-gray-700">Enter Username</label>
                  <TextInput id="username" type="text" placeholder="Username" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Enter Email</label>
                  <TextInput id="email" type="email" placeholder="Email" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Enter Password</label>
                  <TextInput id="password" type="password" placeholder="Enter Password" />
                </div>
                <Button className="bg-gradient-to-r from-purple-700 to-pink-500 text-white" type='submit' >Sign Up</Button>
            </form>
            <div className='pt-2'>Have an account? <Link to='/sign-in' className='underline  text-blue-800'>Click Here!</Link></div>
        </div>
      </div>
    </div>
  )
}
