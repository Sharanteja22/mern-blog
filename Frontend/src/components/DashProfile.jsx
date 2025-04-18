import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { updateFailure,updateSuccess,signoutSuccess,updateStart,deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../redux/user/userSlice';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
export default function DashProfile() {
  const { currentUser ,error} = useSelector((state) => state.user); 
  const [formData,setFormData]=useState({});
  const [updateUserSuccess,setUpdateUserSuccess]=useState(null);
  const [updateUserError,setUpdateUserError]=useState(null);
  const [showModal,setShowModal]=useState(false);
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
      }
    } catch (error) {
      console.log(error.message)  
    }

  }  
  // console.log(formData)
  const handleDeleteUser=async ()=>{
    setShowModal(false);
      try {
        dispatch(deleteUserStart());
        const res= await fetch(`/api/user/delete/${currentUser._id}`,{
          method:'DELETE',  
        });
        const data=await res.json();
        if(!res.ok){
          dispatch(deleteUserFailure(data.message));
        }else{
          dispatch(deleteUserSuccess(data));
        }
      } catch (error) {
        dispatch(deleteUserFailure(error));
      }
  }
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
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={hadnleSignout} className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess &&
        <Alert color='success' className='mt-5 lg:w-3/4 mx-auto'>{updateUserSuccess}</Alert>
      }
      {updateUserError &&
        <Alert color='failure' className='mt-5 lg:w-3/4 mx-auto'>{updateUserError}</Alert>
      } 
      {error &&
        <Alert color='failure' className='mt-5 lg:w-3/4 mx-auto'>{error}</Alert>
      } 
     {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-gray-400 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
        <h3 className="mb-5 text-lg text-gray-700">
          Are you sure you want to delete your account?
        </h3>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDeleteUser}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Yes, I'm Sure
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
