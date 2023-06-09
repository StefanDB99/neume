import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { ChevronDownIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';


function Podcasts({podcasts}) {

    const { user, error, isLoading } = useUser();

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

            <section className={"flex items-center space-x-7 bg-gradient-to-b to-black from-purple-500 h-80 text-white padding-8"}>
                <h1 className='flex font-bold text-5xl pl-10 pt-0'>Podcasts</h1>
            </section>
            <ul className="flex-grow">
            {
                podcasts.result.map((podcast) => (
                    <div key={podcast.id} className="flex items-center justify-center">
                    <li className="p-5">{podcast.contentUrl}</li>
                    {podcast.moderationResult.Classification.Category3.Score > 0.5 && (
                        <ExclamationTriangleIcon className="h-6 w-6 fill-red-600" />
                    )}
                    </div>
                ))
            }
            </ul>
            
        </div>
    )
}



export default Podcasts