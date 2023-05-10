
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

  useEffect(() => {
    if(user) {
      const getUserData = { userid: user.sub, access_token: accessToken};
      const res = fetch('http://localhost:3000/api/getUserData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getUserData)
      }).then(response => response.json())
      .then(data => setUserData(data));

      console.log(userData)
    }
  }, [accessToken, user, userData]) //TODO: Check if works as expected

  return (
  <div className="bg-black h-screen overflow-hidden">
    
    <main className="flex">
      <Sidebar />
      <Center userData={userData} accessToken={accessToken}/>
    </main>

    <div>
      {/* player */}
    </div>
  </div>

  // Old code!!
  
    // <div className={styles.div_login}>
    //   <h1>Welcome</h1>
    //   <button type="button" class="btn btn-primary">
    //   <a className={styles.a_login} href={`https://neume.eu.auth0.com/authorize?response_type=code&client_id=Uu2hAFUBPQ37sD8F3P8ZHRfbfk2GyI35&redirect_uri=http://localhost:3000/home&audience=https://neume/api&scope=openid%20profile%20email%20read:user`}>Login</a>
    // <a className={styles.a_login} href={`https://neume.eu.auth0.com/authorize?response_type=code&client_id=Uu2hAFUBPQ37sD8F3P8ZHRfbfk2GyI35&redirect_uri=http://localhost:3000&audience=https://neume/api&scope=openid%20profile%20email%20read:user`}>Login</a>
    //   </button>

    //   <a href='/api/auth/logout'>Logout</a>

      
      
    // </div>
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