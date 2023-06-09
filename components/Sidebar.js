import React from 'react'
import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, HeartIcon, RssIcon, PlusCircleIcon, CreditCardIcon }  from '@heroicons/react/24/outline';
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link';


function Sidebar() {

    const { user, error, isLoading } = useUser();

    return (
        <div className="text-gray-500 p-5 text-sm border-r border-gray-900
        overflow-y-scroll h-screen scrollbar-hide">
            <div className="space-y-3">

                {
                    (
                        user && 
                        <button className='flex items-center space-x-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full'>
                            <p className='mb-0'><Link href='api/auth/logout' className='no-underline text-white'>Logout</Link></p>
                        </button>
                    )
                }

                
                <button className="flex items-center space-x-2 hover:text-white">
                    <CreditCardIcon className='h-5 w-5'/>
                    <Link href='/Subscribe' className='no-underline text-inherit hover:text-white'><p className="mb-0">Get Neume+</p></Link>
                </button> 
                
                
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className='h-5 w-5'/>
                    <Link href='/' className='no-underline text-inherit hover:text-white'><p className="mb-0">Home</p></Link>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-white">
                    <MagnifyingGlassIcon className='h-5 w-5'/>
                    <p className="mb-0">Search</p>
                </button>    
                <button className="flex items-center space-x-2 hover:text-white">
                    <BuildingLibraryIcon className='h-5 w-5'/>
                    <Link href='my-music' className='no-underline text-inherit hover:text-white'><p className="mb-0">My Music</p></Link>
                </button> 
                <hr className="border-t-[0.1px] border-gray-900"/>

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className='h-5 w-5'/>
                   <Link href='podcasts' className='no-underline text-inherit hover:text-white'><p className="mb-0">My Podcasts</p></Link>
                </button>       
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className='h-5 w-5'/>
                    <p className="mb-0">Liked Songs</p>
                </button> 
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className='h-5 w-5'/>
                    <p className="mb-0">Your Episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>

                {/* Playlists */}
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
            </div>
        </div>
    );
}

export default Sidebar;

