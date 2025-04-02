import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-10 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-10'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold text-green-600'>Search term:</label>
                <input className='border border-rose-400 p-2 w-full rounded-md' type="text" id='searchTerm' placeholder='Search' />
            </div>

            <div className='flex items-center gap-4 flex-wrap'>
                <label className='font-semibold text-green-600'>Pet type:</label>
                <div className='flex gap-2'>
                    <input type="checkbox" id='dogs' className='' />
                    <span>Dogs</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='cats' className='' />
                    <span>Cats</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='birds' className='' />
                    <span>Birds</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='reptiles' className='' />
                    <span>Reptiles</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='others' className='' />
                    <span>Others</span>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <label className='font-semibold text-green-600'>Sort:</label>
                <select className='border border-rose-400 p-2 rounded-md' id="sort_order">
                    <option>Latest</option>
                    <option>Oldest</option>
                    <option>Price low to high</option>
                    <option>Price high to low</option>
                </select>
            </div>

            <button className='bg-rose-400 text-white uppercase p-2 rounded-md hover:bg-green-600'>Search</button>

        </form>
      </div>

      <div className='p-10'>
        <h1 className='text-2xl font-bold text-green-600'>Results:</h1>
      </div>
    </div>
  )
}
