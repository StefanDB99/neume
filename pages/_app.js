import {UserProvider} from '@auth0/nextjs-auth0/client'
import '@/styles/globals.css'
import { CookiesProvider } from 'react-cookie'

export default function App({ Component, pageProps }) {
  return (
    
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    
    )
}
