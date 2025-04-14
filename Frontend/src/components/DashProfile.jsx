import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-6 text-center font-semibold text-3xl">Profile</h1>
      <form className="w-full lg:w-3/4 mx-auto flex flex-col items-center gap-4">
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
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="w-full"
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          className="w-full"
        />
        <Button type='submit' className='w-full bg-gradient-to-r from-purple-700 to-pink-500 text-white'>Update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 w-full lg:w-3/4 mx-auto">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}
