
import { useUser } from '@auth0/nextjs-auth0/client'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Center from '@/components/Center';
import { serialize } from 'cookie'

function Home({ accessToken }) {

  const { user, error, isLoading } = useUser();
  const [userData, setUserData] = useState();

  return (
  <div className="bg-black h-screen overflow-hidden">
    
    <main className="flex">
      <Sidebar />
      <Center userData={userData} accessToken={accessToken}/>
    </main>

    <div>
      {/* cypress testing purposes NOT PRODUCTION
      <h1 className='invisible' id='token'>{accessToken}</h1>  */}
    </div>
  </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const { accessToken } = await getAccessToken(ctx.req, ctx.res)
  
        const serializedUserCookie = serialize('userToken', accessToken, {
          httpOnly: false,
          secure: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
          });

        ctx.res.setHeader('Set-Cookie', [serializedUserCookie]);

        // const getUserData = { userid: userData.sub};
        // const res = await fetch('http://localhost:3000/api/getUserData', {
        //   method: 'POST',
        //   headers: {
        //       'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(getUserData)
        // })

        return { props: { accessToken }}; 
    },
  })

export default Home