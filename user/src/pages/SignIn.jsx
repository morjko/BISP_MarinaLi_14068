import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
  }

  console.log(formData);

  return (
    <div className='mx-auto max-w-lg'>
      <div className='text-green-600 font-bold text-center text-2xl my-10 uppercase'>Sign In</div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input type="email" placeholder='Email' id='email' className='border p-2' onChange={handleChange} required/>
        <input type="password" placeholder='Password' id='password' className='border p-2' onChange={handleChange} required/>
        <button className='p-2 bg-green-500 text-white hover:underline'>Sign In!</button>
      </form>
      <div className='mt-7 text-center'>
        <Link to='/sign-up'>
            <p className='text-green-600 hover:underline hidden sm:inline'>Do not have an account?</p>
        </Link>
      </div>
    </div>
  )
}

