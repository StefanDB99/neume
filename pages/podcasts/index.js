import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import Sidebar from '@/components/Sidebar';
import Podcasts from '@/components/Podcasts';
import axios from 'axios';

export async function getServerSideProps(ctx) {

    const response = await fetch('http://localhost:3000/api/podcasts/getPodcasts');
    const data = await response.json();

    return { props: { data }}
}

function index({data}) {
  return (
    <div className="bg-black h-screen overflow-hidden">
    
    <main className="flex">
      <Sidebar />
      <Podcasts podcasts={data}/>
    </main>

    <div>
      {/* player */}
    </div>
  </div>
  )
}

export default index