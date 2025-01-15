import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
    
      const res = await fetch('/api/auth/signup', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if(data.success===false) {
        setError(data.message);
        setLoading(false);
        return
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className='mx-auto max-w-lg'>
      <div className='text-green-600 font-bold text-center text-2xl my-10 uppercase'>Sign up</div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input type="text" placeholder='Username' id='username' className='border p-2' onChange={handleChange} />
        <input type="email" placeholder='Email' id='email' className='border p-2' onChange={handleChange} />
        <input type="password" placeholder='Password' id='password' className='border p-2' onChange={handleChange} />
        <button disabled={loading} className='p-2 bg-green-500 text-white hover:underline'>{loading? 'Wait, loading': 'Sign Up'}</button>
      </form>
      <div className='mt-7 text-center'>
        <Link to='/sign-in'>
            <p className='text-green-600 hover:underline hidden sm:inline'>Already have an account?</p>
        </Link>
      </div>
      {error && <p className='text-red-300 mt-12'>* {error}</p>}
    </div>
  )
}

