import { useUser } from '@auth0/nextjs-auth0/client'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react'
import Image from 'next/image';

function Center({ userData, accessToken }) {

    const { user, error, isLoading } = useUser();

    return (
        <div className="flex-grow text-white">
            <header className="absolute top-5 right-8">
                
                {
                    (user &&
                        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                            <img className="rounded-full w-10 h-10" src={user.picture} alt="" />
                            <h5>{user.name}</h5>
                            <ChevronDownIcon className="h-5 w-5" />
                        </div>
                    )
                }
                  
            </header>

            <section className={"flex items-end space-x-7 bg-gradient-to-b to-black from-purple-500 h-80 text-white padding-8"}>
               
               {/* {
                (
                    accessToken && 
                    <p>{accessToken}</p>
                )
               } */}
               
                
            </section>
            
            {
                (
                    userData &&
                    <h1>{userData.userName}</h1>
                )
            }
        </div>
    )
}

export default Center