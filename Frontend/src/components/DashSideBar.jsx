import React, { useEffect, useState } from 'react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');
  const dispatch=useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleTabClick = (selectedTab) => {
    navigate(`?tab=${selectedTab}`);
  };

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
    <div className="w-full md:w-56 bg-gray-800 text-white flex flex-col md:min-h-screen ">
      
      <div className="flex-1 px-4 py-6">
        <div className="space-y-4">
          {/* Profile Tab */}
          <div
            onClick={() => handleTabClick('profile')}
            className={`flex items-center gap-3 p-3 rounded cursor-pointer 
              ${tab === 'profile' ? 'bg-gray-400' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            <HiUser className="text-xl" />
            <div className='flex flex-row justify-between w-full'>
              <div className="text-sm font-semibold">Profile</div>
              <div className="text-xs text-gray-300 border bg-gray-900 rounded-md px-1">User</div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="flex items-center gap-3 p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
            <HiArrowSmRight className="text-xl" />
            <span className="text-sm font-semibold" onClick={hadnleSignout}>Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
