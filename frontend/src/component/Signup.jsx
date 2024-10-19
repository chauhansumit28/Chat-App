import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
    const [user, setUser] = useState({
        fullName:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:"",
    })

    const navigate = useNavigate();

    const handlecheckbox = (gender) => {
      setUser({...user,gender})
    }

    const onsubmitHandler = async (e) =>{
       e.preventDefault();
       try {
        const res = await axios.post('http://localhost:7000/api/user/register', user, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
          navigate("/");
          toast.success(res.data.message);
          console.log(res);
          
        
      } catch (error) {
        toast.error( error.response.data.message);
        console.log(error);
      }
      
      setUser({
        fullName:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:"",
      })
    }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3x1 text-2xl font-bold text-center text-black '>Signup</h1>
      
      <form onSubmit={onsubmitHandler}>
        <div>
            <label className='label p-2'>
                <span className='text-base label-text text-black'>Full Name</span>
            </label>
            <input value={user.fullName} onChange={(e)=>setUser({...user,fullName:e.target.value})} className='w-full input input-bordered h-10 bg-white' type="text" placeholder='Full name' />
        </div>

        <div>
            <label className='label p-2'>
                <span className='text-base label-text text-black'>UserName</span>
            </label>
            <input value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} className='w-full input input-bordered h-10 bg-white' type="text" placeholder='Username' />
        </div>

        <div>
            <label className='label p-2'>
                <span className='text-base label-text text-black'>Password</span>
            </label>
            <input value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} className='w-full input input-bordered h-10 bg-white' type="password" placeholder='password' />
        </div>

        <div>
            <label className='label p-2'>
                <span className='text-base label-text text-black'>Confirm password</span>
            </label>
            <input value={user.confirmPassword} onChange={(e)=>setUser({...user,confirmPassword:e.target.value})} className='w-full input input-bordered h-10 bg-white' type="password" placeholder='Confirm password' />
        </div>



        <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p className='text-black'>Male</p>
              <input type="checkbox" checked={user.gender === "male"} onChange={()=>handlecheckbox("male")} className="checkbox mx-2 border-white" />
            </div>
            <div className='flex items-center'>
              <p className='text-black'>Female</p>
              <input type="checkbox" checked={user.gender === "female"} onChange={()=>handlecheckbox("female")} className="checkbox mx-2 border-white" />
            </div>
          </div>
          <p className='text-center my-2 text-gray-100'>Already have an account? <Link to="/login"> login </Link></p>

          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700 text-violet-50'>Singup</button>
          </div>
      </form>
      </div>
    </div>
  )
}

export default Signup
