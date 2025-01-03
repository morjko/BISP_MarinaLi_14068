import { FaSearch } from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-yellow-100'>
        <div className='flex justify-between items-center p-5 max-w-6xl mx-auto'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl'>
                     <a className='text-green-600'>FurryFriends</a>
                </h1>
            </Link> 
            
          <ul className='text-green-600 flex gap-6'>
            <Link to='/'>
                 <li className='hover:underline hidden sm:inline'>Home</li>
            </Link>
            <Link to='/about'>
                 <li className='hover:underline hidden sm:inline'>About</li>
            </Link>
            <Link to='/sign-in'>
                 <li className='hover:underline'>Sign In</li>
            </Link>
          </ul>

          <form className='bg-yellow-50 flex items-center p-3'>
           <input type='text' placeholder='Search ' className='text-green-600 bg-transparent focus:outline-none w-24 sm:w-64'></input>
           <FaSearch className='text-green-600'></FaSearch>
          </form>
        </div>
    </header>
  )
}
