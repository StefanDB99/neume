import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useEffect } from "react";
import { getAccessToken } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const inter = Inter({ subsets: ['latin'] })

const Home = ({ products }) => {

  const router = useRouter();

  useEffect(() => {

    Cookies.set('user_code', router.query.code);

    const data = { user_code: Cookies.get('user_code')};
  
    if (!Cookies.get('user_access_token')) {
      fetch('api/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then((data) => {
        Cookies.set('user_access_token', data.access_token);
      })

    }
    
      
  
  });

  

  return (
    <>
      <h1>Welcome</h1>
      <a href='/api/auth/logout'>Logout</a>
      <a href={`https://neume.eu.auth0.com/authorize?response_type=code&client_id=Uu2hAFUBPQ37sD8F3P8ZHRfbfk2GyI35&redirect_uri=http://localhost:3000/&audience=https://neume.eu.auth0.com/api/v2/`}>Login</a>
    </>
  )
  

  
}

export default Home