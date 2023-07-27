
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn,signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {

  const {data:session} =  useSession()

  const [providers,setProviders] = useState(null)
  const [toggelDropdown, setToggelDropdown] = useState(false)

  useEffect(() =>{
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setUpProviders()
  },[])

  return (
    <nav className='flex-between mb-16 w-full pt-3'>
        <Link href='/' className='flex flex-center gap-2' >
          <Image
            src='/assets/images/logo.svg'
            alt='logo'
            width={30}
            height={30}
            className='object-contain'
          />
          <p className='logo_text'>PromptBotix</p>
        </Link>
        {/* /* desktop navigation */}
        <div className='sm:flex hidden'>
            {session?.user ?(
              <div className='gap-3 flex md:gap-5'>
                  <Link href='/create-prompt' className='black_btn'>
                    create post
                  </Link>
                  <button type='button' onClick={signOut} className='outline_btn'>
                    SignOut
                  </button>
                  <Link href='/profile'>
                    <Image
                      src={session?.user.image}
                      alt='profile'
                      width={37}
                      height={37}
                      className='rounded-full'
                    />
                  </Link>
              </div>
            ): (
              <>
                {providers && 
                  Object.values(providers).map((provider) => (
                    <button type='button'
                      key={provider.name}
                      onClick={()=> signIn(provider.id)}
                      className='black_btn'
                    >
                      SignIn
                    </button>
                  ))}
              </>
            )}
        </div>
        {/* /* mobile navigation */}
        <div className='sm:hidden flex realtive'>
          {session?.user ? (
            <div className='flex'>
              <Image
                  src={session?.user.image}
                  alt='profile'
                  width={37}
                  height={37}
                  className='rounded-full'
                  onClick={()=>setToggelDropdown((prev)=> !prev)}
                />

                {toggelDropdown && (
                  <div className='dropdown'>
                    <Link
                      href='/profile'
                      className='dropdown_link'
                      onClick={()=> setToggelDropdown(false)}
                    >
                      my profile 
                    </Link>
                    <Link
                      href='/create-prompt'
                      className='dropdown_link'
                      onClick={()=> setToggelDropdown(false)}
                    >
                      create prompt 
                    </Link>
                    <button type='button '
                      onClick={()=> {setToggelDropdown(false); signOut();}}
                      className='mt-5 w-full black_btn'
                      >
                        Sign out
                    </button>

                  </div>
                )}

            </div>
          ):(
            <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button type='button'
                  key={provider.name}
                  onClick={()=> signIn(provider.id)}
                  className='black_btn'
                >
                  SignIn
                </button>
              ))}
          </>
          )}

        </div>
    </nav>
  )
}

export default Nav