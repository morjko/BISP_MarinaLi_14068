import React from 'react';
import {Link} from 'react-router-dom';

export default function SignIn() {
  return (
    <div className='mx-auto max-w-lg'>
      <div className='text-green-600 font-bold text-center text-2xl my-10 uppercase'>Sign in</div>
      <form className='flex flex-col gap-5'>
        <input type="email" placeholder='Email' id='Email' className='border p-2'/>
        <input type="password" placeholder='Password' id='Password' className='border p-2'/>
        <button className='p-2 bg-green-500 text-white hover:underline'>Sign In!</button>
      </form>
      <div className='mt-7 text-center'>
        <Link to='/sign-up'>
            <p className='text-green-600 hover:underline hidden sm:inline'>Do not have an account?</p>
        </Link>
      </div>
    </div>
  )
};