import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { set } from 'mongoose';
import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage,setErroMessage]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate= useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData); // show updated data
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.username|| !formData.email || !formData.password){
      return setErroMessage("Please fill all the fields");
    }
    console.log(e);
    try {
      setLoading(true);
      setErroMessage(null);
      const res=await fetch('/api/auth/signup',{
        method: 'POST',
        headers : {'content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data= await res.json();
      
    if (data.success===false) {
      return setErroMessage(data.message);
    }
    setLoading(false);
    if(res.ok){
      navigate('/sign-in')
    }
    } catch (error) {
      setLoading(false);
      return setErroMessage(error.message);

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
            Sign up here!<br />  
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Enter Username</label>
              <TextInput id="username" type="text" placeholder="Username" onChange={handleChange} />
            </div>
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
                :'Sign Up'
              }
            </Button>
          </form>
          <div className='pt-2'>Have an account? <Link to='/sign-in' className='underline text-blue-800'>Click Here!</Link></div>
            {
              errorMessage && (<Alert className='mt-5' color="failure">{errorMessage}</Alert>)
            }
        </div>
      </div>
    </div>
  );
}
