import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { updateFailure,updateSuccess,updateStart } from '../redux/user/userSlice';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user); 
  const [formData,setFormData]=useState({});
  const [updateUserSuccess,setUpdateUserSuccess]=useState(null);
  const [updateUserError,setUpdateUserError]=useState(null);
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value
    })
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if(Object.keys(formData).length===0){
      setUpdateUserError("No changes Made");
      return
    }  
    try {
      dispatch(updateStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{'content-Type':'application/json'},
        body:JSON.stringify(formData)
      });   
      const data=await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('User Profile Updated Successfully!');
      }
    } catch (error) {
      dispatch(updateFailure(error));
      setUpdateUserError(error);
    }
  }
  console.log(formData)
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-6 text-center font-semibold text-3xl">Profile</h1>
      <form className="w-full lg:w-3/4 mx-auto flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        <div className="w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-[lightgray] border-8"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="w-full"
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="w-full"
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          className="w-full"
          onChange={handleChange}
        />
        <Button type='submit' className='w-full bg-gradient-to-r from-purple-700 to-pink-500 text-white'>Update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 w-full lg:w-3/4 mx-auto">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess &&
        <Alert color='success' className='mt-5 lg:w-3/4 mx-auto'>{updateUserSuccess}</Alert>
      }
      {updateUserError &&
        <Alert color='failure' className='mt-5 lg:w-3/4 mx-auto'>{updateUserError}</Alert>
      }
    </div>
  );
}
