import React from 'react'

export default function Profile() {
  return (
    <div className='max-w-lg mx-auto'>
      <div className='text-green-600 font-bold text-center text-2xl my-10'>My Profile</div>
      <form className='flex flex-col gap-5'>
        <input type="text" placeholder='username' id='username' className='border p-2' />
        <input type="email" placeholder='email' id='email' className='border p-2' />
        <button className='p-2 bg-green-600 text-white hover:underline'>Edit personal information</button>
      </form>

      <div className='flex justify-between mt-10'>
        <button className='bg-transparent hover:text-red-600 hover:underline'>Sign out</button>
        <button className='bg-transparent hover:text-red-600 hover:underline'>Delete account</button>
      </div>
    </div>
  )
}
