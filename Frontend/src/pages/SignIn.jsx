import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading,error:errorMessage}=useSelector((state)=> state.user);
  const navigate= useNavigate();
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData); // show updated data
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if( !formData.email || !formData.password){
      return dispatch(signInFailure('Please fill all fields'));
      
    }
    console.log(e);
    try {
      dispatch(signInStart());
      const res=await fetch('/api/auth/signin',{
        method: 'POST',
        headers : {'content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data= await res.json();
      
    if (data.success===false) {
      dispatch(signInFailure(data.message));
    }
    if(res.ok){
      dispatch(signInSuccess(data));
      navigate('/')
    }
    } catch (error) {
      dispatch(signInFailure(error));

    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to='/' className='font-bold text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded'>
              Teja's
            </span>
            Blog 
          </Link>
          <p className='text-sm mt-5'>
            Wanna explore on some interesting topics?<br />
            Sign In here!<br />  
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            
            <div className='flex flex-col gap-1'>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Enter Email</label>
              <TextInput id="email" type="email" placeholder="Email" onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Enter Password</label>
              <TextInput id="password" type="password" placeholder="Enter Password" onChange={handleChange} />
            </div>
            <Button className="bg-gradient-to-r from-purple-700 to-pink-500 text-white" type='submit' disabled={loading}>
              {
                loading?
                (
                  <>
                     <Spinner size="sm"/><span>Loading...</span>
                  </>
                ) 
                :'Sign In'
              }
            </Button>
          </form>
          <div className='pt-2'>Dont Have an account? <Link to='/sign-Up' className='underline text-blue-800'>Click Here!</Link></div>
            {
              errorMessage && (<Alert className='mt-5' color="failure">{errorMessage}</Alert>)
            }
        </div>
      </div>  
    </div>
  );
}
