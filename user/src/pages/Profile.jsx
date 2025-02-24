import React, { useRef, useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import {getFirestore, doc, setDoc} from 'firebase/firestore';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const database = getFirestore(app);

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


  return (
    <div className='max-w-lg mx-auto'>
      <div className='text-green-600 font-bold text-center text-2xl my-10'>My Profile</div>
      <form className='flex flex-col gap-5'>
        <input hidden type="file" ref={fileRef} accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
        <img onClick={()=> fileRef.current.click()} className='rounded-full h-20 w-20 cursor-pointer self-center object-cover' src={formData.ava || currentUser.ava} alt="Image" />
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
