import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';

export default function CreateAdvert() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        fileUrls: [],
    })
    const [fileUploadError, setFileUploadError] = useState(false);

    console.log(formData)

    const handleFileSubmit = (e) => {
        if (files.length > 0 && files.length + formData.fileUrls.length < 11) {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeFile(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, fileUrls: formData.fileUrls.concat(urls)});
                setFileUploadError(false);
            }).catch((error) => {
                setFileUploadError('There is an error while image upload (should be 3 MB per file)')
            })
        } else {
            setFileUploadError('Can upload 10 images max')
        }
    }

    const storeFile = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed", 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`)
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        resolve(downloadUrl);
                    })
                }
            )
        })
    }

    const handleFileDelete = (index) => {
        setFormData({
            ...formData,
            fileUrls: formData.fileUrls.filter((_, i) => i !== index)
        })
    }

  return (
    <div className='max-w-3xl mx-auto'>
        <div className='text-rose-400 font-bold text-center text-2xl my-10'>Fill out to become a Pet Sitter!</div>
        <form className='flex flex-col sm:flex-row gap-5 p-2'>
            <div className='flex flex-col flex-1 gap-5'>
                <input type="text" placeholder='Name' className='border p-2' id='name' maxLength='62' minLength='10' required />
                <textarea type="text" placeholder='Bio' className='border p-2' id='bio' required />
                <input type="text" placeholder='Location' className='border p-2' id='location' required />

                <p className='text-green-600 font-semibold'>
                    Download images (Up to 10 files): 
                </p>
                <div className='flex items-center gap-2'>
                    <input onChange={(e) => setFiles(e.target.files) } type="file" id='images' accept='images/*' multiple className='w-full' />
                    <button onClick={handleFileSubmit} type='button' className='p-2 text-rose-400 border border-rose-400 hover:underline'>Upload</button>
                </div>
                <p className='text-red-600'>{fileUploadError && fileUploadError}</p>
                {
                    formData.fileUrls.length > 0 && formData.fileUrls.map((url, index) => (
                        <div key={url} className='flex justify-between items-center border border-green-600 p-4'>
                            <img src={url} alt="Advert image" className='h-20 w-20 object-contain' />
                            <button onClick={() => handleFileDelete(index)} type='button' className='hover:text-red-600'>Delete</button>
                        </div>
                    ))
                }
            </div>

            <div className='flex flex-col flex-1 gap-4'>
                <div className='flex items-center gap-1 mt-2'>
                    <p className='text-green-600 font-semibold'>Price (UZS / hour):</p>
                    <input type="number" id='price' min='10000' className='border border-grey p-3 w-15 h-4' />
                </div>

                <div className='text-green-600 font-semibold mt-2'>Check the types of pets you are able to pet sit: </div>

                <div className='flex flex-wrap gap-4 mt-1'>
                    <div className='flex gap-1 items-center'>
                        <input type="checkbox" id='dogs' className='h-3 w-3' />
                        <span>Dogs</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <input type="checkbox" id='cats' className='h-3 w-3' />
                        <span>Cats</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <input type="checkbox" id='birds' className='h-3 w-3' />
                        <span>Birds</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <input type="checkbox" id='reptiles' className='h-3 w-3' />
                        <span>Reptiles</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <input type="checkbox" id='others' className='h-3 w-3' />
                        <span>Others</span>
                    </div>
                </div>

                <button className='p-2 bg-rose-400 text-white hover:underline mt-1.5'>Create advert</button>
            </div>
        </form>
    </div>
  )
}
