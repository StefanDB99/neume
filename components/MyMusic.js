import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

function MyMusic({token}) {

    const { user, error, isLoading } = useUser();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file)

        console.log(selectedFile);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('audio', selectedFile);

        try {
            const response = await axios.post('/api/upload/postUpload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              params: {
                uid: user.sub,
              }
            });
        
            console.log(response.data);
          } catch (error) {
            console.error('Error uploading audio file:', error);
          }
    } 

    return (
        <div className="flex-grow text-white">

        <header className="absolute top-5 right-8">
            
            {
                (user &&
                    <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                        <img className="rounded-full w-10 h-10" src={user.picture} alt=""/>
                        <h5>{user.name}</h5>
                        <ChevronDownIcon className="h-5 w-5" />
                    </div>
                )
            }
            
        </header>

        <section className={"flex items-end space-x-7 bg-gradient-to-b to-black from-purple-500 h-80 text-white padding-8"}>
            
        </section>

        <div class="flex flex-col items-center justify-center text-white">
            <h1 className='flex font-bold text-2xl pb-5'>Upload your podcast</h1>

            <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data">
                    <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        File
                    </label>
                    <input class="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="file" name="file" placeholder="file" onChange={handleFileChange}/>
                    </div>

                    <button class="flex items-center space-x-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleUpload}>
                        Upload
                    </button>
                </form>
                
            </div>

            
        </div>
    </div>
    )
}

export default MyMusic