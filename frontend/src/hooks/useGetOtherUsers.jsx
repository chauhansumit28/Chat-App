import React, { useEffect } from 'react';
import axios from "axios";
import {useDispatch} from 'react-redux';
import { setotherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
 
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchOtherUser = async () =>{
            try {
                axios.defaults.withCredentials =true
               const res = await axios.get(`http://localhost:7000/api/user/otheruser`);
            
                //store
                dispatch(setotherUsers(res.data));
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchOtherUser();
    },[])
}

export default useGetOtherUsers
