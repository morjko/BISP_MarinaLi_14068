import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateAdvert() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        fileUrls: [],
        name: '',
        bio: '',
        location: '',
        price: 10000,
        dogs: false,
        cats: false, 
        birds: false,
        reptiles: false,
        others: false
    })
    const [fileUploadError, setFileUploadError] = useState(false);
    const [error, setError] = useState(false);
    const {currentUser} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchAdvert = async () => {
            const advertId = params.advertId;
            const res = await fetch(`/api/advert/get/${advertId}`);
            const data = await res.json();
            console.log(data)
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            if (formData.fileUrls.length === 0) {
                setFormData({
                    ...data,
                    fileUrls: Array.isArray(data.fileUrls) ? data.fileUrls : []
                })
            }
        }
        fetchAdvert();
    }, [params.advertId])

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

    const handleChange = (e) => {
        if (e.target.type === 'text' || e.target.type === 'textarea' || e.target.type === 'number') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }

        if (e.target.id === 'dogs' || e.target.id === 'cats' || e.target.id === 'birds' || e.target.id === 'reptiles' || e.target.id === 'others') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.fileUrls.length<1) return setError('Need to upload at least 1 image');
            setError(false);
            const res = await fetch(`/api/advert/edit/${params.advertId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                })
            })

            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/advert/${data._id}`);
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className='max-w-3xl mx-auto'>
        <div className='text-rose-400 font-bold text-center text-2xl my-10'>Edit an Advert</div>
        {error && <p className='text-red-600 text-center mb-5'>Error: {error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-5 p-2'>
            <div className='flex flex-col flex-1 gap-5'>
                <input onChange={handleChange} value={formData.name} type="text" placeholder='Name' className='border p-2' id='name' maxLength='70' minLength='5' required />
                <textarea onChange={handleChange} value={formData.bio} type="text" placeholder='Bio' className='border p-2' id='bio' required />
                <input onChange={handleChange} value={formData.location}  type="text" placeholder='Location' className='border p-2' id='location' required />

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
                            <img src={url} alt={`Advert image ${index + 1}`} className='h-20 w-20 object-contain' />
                            <button onClick={() => handleFileDelete(index)} type='button' className='hover:text-red-600'>Delete</button>
                        </div>
                    ))
                }
            </div>

            <div className='flex flex-col flex-1 gap-4'>
                <div className='flex items-center gap-1 mt-2'>
                    <p className='text-green-600 font-semibold'>Price (UZS / hour):</p>
                    <input onChange={handleChange} value={formData.price} type="number" id='price' min='10000' className='border border-grey p-3 w-15 h-4' />
                </div>

                <div className='text-green-600 font-semibold mt-2'>Check the types of pets you are able to pet sit: </div>

                <div className='flex flex-wrap gap-4 mt-1'>
                    <div className='flex gap-1 items-center'>
                        <input onChange={handleChange} checked={formData.dogs} type="checkbox" id='dogs' className='h-3 w-3' />
                        <span>Dogs</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <input onChange={handleChange} checked={formData.cats} type="checkbox" id='cats' className='h-3 w-3' />
                        <span>Cats</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <input onChange={handleChange} checked={formData.birds} type="checkbox" id='birds' className='h-3 w-3' />
                        <span>Birds</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <input onChange={handleChange} checked={formData.reptiles} type="checkbox" id='reptiles' className='h-3 w-3' />
                        <span>Reptiles</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <input type="checkbox" id='others' className='h-3 w-3' />
                        <span>Others</span>
                    </div>
                </div>

                <button className='p-2 bg-rose-400 text-white hover:underline mt-1.5'>Edit advert</button>

            </div>
        </form>
    </div>
  )
}
