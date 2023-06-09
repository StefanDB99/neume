import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import Sidebar from '@/components/Sidebar';
import MyMusic from '@/components/MyMusic';

function index() {
  return (
    <div className="bg-black h-screen overflow-hidden">
    
    <main className="flex">
      <Sidebar />
      <MyMusic/>
    </main>

    <div>
      {/* player */}
    </div>
  </div>
  )
}

export const getServerSideProps = withPageAuthRequired();

export default index