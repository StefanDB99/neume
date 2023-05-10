// import React, { Component } from 'react'
// import { Button } from 'react-bootstrap'
// import { h1 } from 'react-bootstrap'
// import styles from '../../styles/home.module.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Cookies from 'js-cookie'
// import { useEffect } from "react";
// import { serialize } from 'cookie'
// import { withPageAuthRequired } from '@auth0/nextjs-auth0'
// import { useUser } from '@auth0/nextjs-auth0/client';

// export async function getServerSideProps(context) {

//     const user = {};
//     let userData = {};


//     // if(context.req.cookies.userToken){
//     //     return { props: { } }
//     // }

//     const bodyData = { user_code: context.query.code};
//     const fetchToken = fetch('http://localhost:3000/api/tokens', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(bodyData)
//         }).then(res => res.json());

//     const fetchUser = fetchToken.then(tokenData => {

//         const getUserData = { access_token: tokenData.access_token};
//         return fetch('http://localhost:3000/api/getUser', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(getUserData)
//             }).then(res => res.json());
//     })



//   //   const fetchUserData = fetchUser.then(userData => {

//   //     console.log("userData: " + userData.sub)
//   //     const getUserData = { userid: userData.sub};
//   //     return fetch('http://localhost:3000/api/getUserData', {
//   //         method: 'POST',
//   //         headers: {
//   //             'Content-Type': 'application/json'
//   //         },
//   //         body: JSON.stringify(getUserData)
//   //         }).then(res => res.json())
//   // })

//     const [dataToken, dataUser] = await Promise.all([fetchToken, fetchUser]);

//     user.uid = dataUser.sub;
//     user.access_token = dataToken.access_token;
//     const serializedCookie = serialize('userToken', user.access_token, {
//         httpOnly: true,
//         secure: true,
//         maxAge: 60 * 60 * 24 * 7, // 1 week
//         path: '/',
//       });

//     const serializedUserCookie = serialize('userSub', user.uid, {
//     httpOnly: true,
//     secure: true,
//     maxAge: 60 * 60 * 24 * 7, // 1 week
//     path: '/',
//     });

//     context.res.setHeader('Set-Cookie', [serializedCookie, serializedUserCookie]);

//     return { props: { user, userData }}; 
//   }

// function home({ user, dataUserData }) {
//   const { authUser, error, isLoading } = useUser();
//     const isPremium = false;

//     useEffect(() => {
//       console.log(authUser);
//     }, [])
    

//       return (
//    <div className={styles.navbar}>
//       <div class="row">
//         <div class="col-sm">
//           <p class="h1">Playlist</p>
//         </div>
//         <div class="col-sm">

//           { isPremium ? (<div class="list-group">
//               <a href="#" class="list-group-item list-group-item-action active">
//               Song #1
//               </a>
//               <a href="#" class="list-group-item list-group-item-action">Song #2</a>
//               <a href="#" class="list-group-item list-group-item-action">Song #3</a>
//               <a href="#" class="list-group-item list-group-item-action">Song #4</a>
//               <a href="#" class="list-group-item list-group-item-action">Song #5</a>
//           </div>) : (<p class="h2">No Access</p>)}
//         </div>
//       </div>
    
//    </div>  
//   )
// }

// export default home
