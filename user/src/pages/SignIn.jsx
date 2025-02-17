import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    // page will not be refreshed once form submitted
    e.preventDefault();

    try {
      dispatch(signInStart());
      
      const res = await fetch('/api/auth/signin', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if(data.success===false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='mx-auto max-w-lg'>
      <div className='text-green-600 font-bold text-center text-2xl my-10'>Welcome back to FurryFriends!</div>
      {error && <p className='text-red-700 mb-12 text-center'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input type="email" placeholder='Email' id='email' className='border p-2' onChange={handleChange} required/>
        <input type="password" placeholder='Password' id='password' className='border p-2' onChange={handleChange} required/>
        <button disabled={loading} className='p-2 bg-rose-400 text-white hover:underline'>{loading? 'Wait, loading': 'Sign In'}</button>
      </form>
      <div className='mt-7 text-center'>
        <Link to='/sign-up'>
            <p className='text-green-600 hover:underline hidden sm:inline'>Do not have an account?</p>
        </Link>
      </div>
    </div>
  )
}

