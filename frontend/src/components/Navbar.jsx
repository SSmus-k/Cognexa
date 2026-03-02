import React from 'react'
import { MaxWidthWrapper } from './index.js'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Navbar() {

    const user = false

  return (
    <nav className='sticky z-100 h-16 inset-x-0 top-0 w-full font-dm border-b border-gray-200 bg-white backdrop-blur-lg transition-all'>
        <MaxWidthWrapper>
            <div className='flex h-16 items-center justify-between'>
                <Link to={'/'} className='flex z-40 text-xl font-semibold text-blue-600'>
                Cognexa
                </Link>

                <div className='h-full flex items-center space-x-6'>
                    {
                        user ? 
                        <>
                        <button className='text-sm text-neutral-800 cursor-pointer rounded-md'>Sign out</button>
                        <Link to={"/dashboard"} className='flex items-center gap-1 bg-blue-600 px-4  py-2 text-sm text-neutral-100 cursor-pointer rounded-md'> Dashboard <ArrowRight size={16}/> </Link>
                        </> : 
                        <>
                        <Link to={"/pricing"} className='flex items-center gap-1 text-sm text-neutral-800 cursor-pointer rounded-md'> Pricing </Link>
                        <Link to={"/signin"} className='flex items-center gap-1 text-sm text-neutral-800 cursor-pointer rounded-md'> Sign in </Link>
                        <div className='h-8 w-px bg-gray-200' />
                        <Link to={"/signup"} className='flex items-center gap-1 bg-blue-600 px-4  py-2 text-sm text-neutral-100 cursor-pointer rounded-md'> Sign up <ArrowRight size={16}/> </Link>
                        </>
                    }
                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}
