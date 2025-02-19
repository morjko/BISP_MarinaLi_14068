import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const output = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: output.user.displayName, email: output.user.email, photo: output.user.photo})
            }) 
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
            
        } catch (error) {
            console.log("There is an error to sign in with Google", error);
        }
    }

  return (
    <button onClick={handleGoogleClick} type='button' className='p-2 bg-green-600 text-white hover:underline'>Continue with Google</button>
  )
}
