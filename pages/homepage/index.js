import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const home = () => {
  return (
    <div>Homepage</div>
  )
}

export default home

export const getServerSideProps = withPageAuthRequired();