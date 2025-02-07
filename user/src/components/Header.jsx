import { FaSearch } from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-rose-400'>
        <div className='flex justify-between items-center p-5 max-w-6xl mx-auto'>
            <Link to='/'>
                <h1 className='text-rose-50 font-bold text-sm sm:text-xl'>
                     <a>FurryFriends</a>
                </h1>
            </Link> 
            
          <ul className='text-rose-50 flex gap-6'>
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

          <form className='bg-rose-50 flex items-center p-3'>
           <input type='text' placeholder='Search ' className='text-rose-400 bg-transparent focus:outline-none w-24 sm:w-64'></input>
           <FaSearch className='text-rose-400'></FaSearch>
          </form>
        </div>
    </header>
  )
}
