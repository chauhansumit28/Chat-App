import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';  // Assuming this is a component
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setotherUsers } from '../redux/userSlice';

const Sidebar = () => {
  const { otherUsers } = useSelector(store => store.user);  // Renaming to avoid conflict
  const [Search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find(user => 
      user.fullName.toLowerCase().includes(Search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setotherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  }

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
        <input 
          value={Search} 
          onChange={(e) => setSearch(e.target.value)} 
          className='input input-bordered rounded-md' 
          type="text" 
          placeholder='Search...'
        />
        <button type='submit' className='btn bg-zinc-700 text-white'>
          <BiSearchAlt2 className='w-6 h-6 outline-none' />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />  {/* This is the component */}
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
