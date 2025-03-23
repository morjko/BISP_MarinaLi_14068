import React, { useRef, useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { signOutFailure, signOutStart, signOutSuccess, editUserStart, editUserSuccess, editUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';

export default function Profile() {
  const {currentUser, error} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [editSuccess, setEditSuccess] = useState(false);
  
  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime()+file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePercentage(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => setFormData({...formData, ava: downloadURl})
     )
    }
   )
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success===false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(editUserStart());
      const res = await fetch(`/api/user/edit/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(editUserFailure(data.message));
        return;
      }
      dispatch(editUserSuccess(data));
      setEditSuccess(true);
    } catch (error) {
      dispatch(editUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })
      const data = await res.json;
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }


  return (
    <div className='max-w-lg mx-auto'>
      <div className='text-green-600 font-bold text-center text-2xl my-10'>My Profile</div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input hidden type="file" ref={fileRef} accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
        <img onClick={()=> fileRef.current.click()} className='rounded-full h-36 w-36 cursor-pointer self-center object-cover' src={formData.ava || currentUser.ava} alt="Image" />
        <p className='text-center text-sm'>
        {fileUploadError ? (
            <span className='text-red-600'>File should be less than 3 MB</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-rose-400'>
              {`Uploading ${filePercentage}%`}
            </span>
          ) : filePercentage === 100 ? (
            <span className='text-green-600'>Image has been uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <p className='text-red-600 text-center'>{error ? error: ''}</p>
        <p className='text-green-600 text-center'>{editSuccess ? 'Your profile information has been edited successfully' : ''}</p>
        <input onChange={handleChange} defaultValue={currentUser.username} type="text" placeholder='username' id='username' className='border p-2' />
        <input onChange={handleChange} defaultValue={currentUser.email} type="email" placeholder='email' id='email' className='border p-2' />
        <button className='p-2 bg-green-600 text-white hover:underline'>Save profile info</button>
        <Link to={"/create-advert"} className='p-2 text-white bg-rose-400 text-center hover:underline'>
           Create Advert
        </Link>
      </form>

      <div className='flex justify-between mt-10'>
        <button className='bg-transparent hover:text-red-600 hover:underline' onClick={handleSignOut}>Sign out</button>
        <button className='bg-transparent hover:text-red-600 hover:underline' onClick={handleDeleteUser}>Delete account</button>
      </div>
    </div>
  )
}
