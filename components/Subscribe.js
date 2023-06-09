import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getAccessToken } from '@auth0/nextjs-auth0';
import Cookies from 'js-cookie';
import Image from 'next/image';
import axios from 'axios';


export async function getServerSideProps(ctx) {

    const token = ctx.req.cookies.userToken

    return { props: { token }}
}

function Subscribe({token}) {

    const { user, error, isLoading } = useUser();

    async function makeTransaction() {
        
        const userToken = Cookies.get('userToken');

        const bodyData = { user_code: userToken};
        
        const body = {
            "id": 1278,
            "date": "2023-04-20T10:18:37.476Z",
            "paymentMethod": "string",
            "status": "string",
            "customerID": "google-oauth2|109146365617277733069",
            "description": "string"
        }

        // https://20.4.165.91/neume-billing-service/api/Transaction
        const transactionData = { userId: user.sub, access_token: userToken};
        const data = await axios.post('https://stefandeboer.com/neume-billing-service/api/Transaction', body, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            }
        });

        return data
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
            <h1 className='flex font-bold text-2xl pb-5'>Subscribe to Neume+</h1>
            <button type='submit' class="flex items-center space-x-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => makeTransaction()}>
                Subscribe
            </button>
        </div>
    </div>
    )
}

export default Subscribe