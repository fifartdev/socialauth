'use client'
import React, { useEffect, useState } from 'react'
import { Client, Account } from "appwrite";
import { redirect, useRouter } from 'next/navigation';

const client = new Client();

client.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT_URL).setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const account = new Account(client);

function WelcomePage() {

    const router = useRouter()
    
    const [session,setSession] = useState(null)

    const getSession = async () => {
        try {
            
            const res = await account.getSession('current');
            setSession(res)
        } catch (error) {
            console.log('Error in Welcome page: ', error.message);
        }
    }

    const logOut = async () => {
        await account.deleteSession('current')
        setSession(null)
        router.push('/')
    }


    useEffect(()=>{
        getSession()
    },[])



if(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <img src='https://fifart.net/wp-content/uploads/2019/04/logo-website.png' className='max-w-32'/>
      WelcomePage
      <button onClick={logOut}>Logout</button>
      </div></main>
      
  )
}

export default WelcomePage