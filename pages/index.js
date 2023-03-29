import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { user, error, isLoading } = useUser();

  console.log(user);

  if (user) {
    return (
      <>
        <h1>Welcome {user.name}!</h1>
        <a href='/api/auth/logout'>Logout</a>
      </>
    )
  }

  return <a href='/api/auth/login'>Login</a>
}
